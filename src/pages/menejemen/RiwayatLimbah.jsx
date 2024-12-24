import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import ButtonHref from "../../components/Button/ButtonHref";
import config from "../../config/config";
import ImageImport from "../../data/ImageImport";
import { showAlert } from "../../components/SweetAlert/SweetAlert.js";
import { useNavigate } from "react-router-dom";

export default function RiwayatLimbah() {
  const [riwayatData, setRiwayatData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  //  navigation
  const navigate = useNavigate();

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("id-ID");
  };

  const fetchRiwayatData = async () => {
    try {
      const token = sessionStorage.getItem("Token"); // Ambil token dari sessionStorage
      const response = await axios.get(`${config.apiUrl}/riwayat`, {
        headers: {
          Authorization: `${token}`, // Menambahkan token ke header Authorization
        },
      });
      setRiwayatData(response.data); // Menyimpan data yang diterima
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      // Menangani error yang dikirimkan oleh server
      let errorMessage = "Masukan tanggal awal dan akhir terlebih dahulu";
      showAlert({
        title: "Perhatian",
        text: `${errorMessage}`,
        iconType: "error",
        didClose: () => {
          navigate("/dashboard/riwayat");
          window.location.reload();
        },
      });
      setTimeout(() => {
        window.location.reload(); // Refresh halaman setelah 4 detik
      }, 2500);
    }
  };

  const generatePDF = (filteredData) => {
    const doc = new jsPDF();

    // Tambahkan logo
    // Tambahkan logo
    doc.addImage(ImageImport.logo, "PNG", 75, 10, 50, 10);

    // Tambahkan judul laporan
    doc.setFontSize(16);
    doc.text("Laporan Riwayat Limbah", 100, 30, { align: "center" });

    // Tambahkan periode laporan
    doc.setFontSize(12);
    doc.text(
      `Periode: ${formatDate(startDate)} - ${formatDate(endDate)}`,
      100,
      40,
      { align: "center" }
    );

    // Tambahkan tabel
    const tableColumn = ["Tenggat", "Limbah", "Target", "Status"];
    const tableRows = filteredData.map((item) => [
      formatDate(item.tgl_selesai_pengelolaan),
      item.nama_limbah,
      item.target_olahan,
      item.status,
    ]);

    doc.autoTable({
      startY: 50,
      head: [tableColumn],
      body: tableRows,
      styles: { halign: "center" },
    });

    // Simpan file PDF
    doc.save(`Laporan_Riwayat_Limbah_${startDate}_${endDate}.pdf`);
  };

  // Filter data berdasarkan tanggal
  const filteredTableData = riwayatData.filter((item) => {
    if (!startDate || !endDate) return true; // Jika tanggal belum dipilih, tampilkan semua data

    // Setel waktu semua tanggal ke 00:00:00
    const itemDate = new Date(item.tgl_selesai_pengelolaan);
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Set waktu ke 00:00:00
    itemDate.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    return itemDate >= start && itemDate <= end;
  });

  const handlePrint = () => {
    if (!startDate || !endDate) {
      showAlert({
        title: "Perhatian",
        text: "Masukan tanggal awal dan akhir terlebih dahulu",
        iconType: "error",
        didClose: () => {
          navigate("/dashboard/riwayat");
          window.location.reload();
        },
      });
    } else {
      const filteredData = riwayatData.filter((item) => {
        // Setel waktu semua tanggal ke 00:00:00
        const itemDate = new Date(item.tgl_selesai_pengelolaan);
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Set waktu ke 00:00:00
        itemDate.setHours(0, 0, 0, 0);
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        return itemDate >= start && itemDate <= end;
      });

      generatePDF(filteredData);
      showAlert({
        title: `Success`,
        text: "Laporan Berhasil Dicetak",
        iconType: "success",
        // didClose: onClose, // Tutup modal setelah alert ditutup
        didClose: () => {
          navigate("/dashboard/riwayat");
          window.location.reload();
        },
      });
    }
  };

  useEffect(() => {
    fetchRiwayatData();
  }, []);

  return (
    <div>
      <div className="w-full h-auto rounded-md py-5 space-y-5">
        <div className="bg-white w-full h-[100%] rounded-md border-2 border-black">
          <div className="px-2">
            <div className="flex justify-center pb-4">
              <h1 className="font-bold text-3xl p-5">
                Riwayat Pengolahan Limbah
              </h1>
            </div>

            <i className="text-gray-500">
              *Masukkan periode tengat data pengolahan yang ingin dicetak!*
            </i>
            <div className="flex lg:flex-row flex-col pb-5 pt-2">
              <div className="mb-1 me-3">
                <input
                  type="date"
                  className="h-14 w-full rounded-lg border border-gray-300 p-2"
                  placeholder="Tanggal Awal"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="mb-1">
                <input
                  type="date"
                  className="h-14 w-full rounded-lg border border-gray-300 p-2"
                  placeholder="Tanggal Akhir"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-3 px-6 text-left text-gray-700 font-medium">
                      Tenggat
                    </th>
                    <th className="py-3 px-6 text-left text-gray-700 font-medium">
                      Limbah
                    </th>
                    <th className="py-3 px-6 text-left text-gray-700 font-medium">
                      Target
                    </th>
                    <th className="py-3 px-6 text-left text-gray-700 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTableData.map((item) => (
                    <tr key={item.riwayat_id} className="border">
                      <td className="py-3 px-6 text-gray-600">
                        {formatDate(item.tgl_selesai_pengelolaan)}
                      </td>
                      <td className="py-3 px-6 text-gray-600">
                        {item.nama_limbah}
                      </td>
                      <td className="py-3 px-6 text-gray-600">
                        {item.target_olahan}
                      </td>
                      <td className="py-3 px-6 text-gray-600">
                        <span
                          className={`px-2 py-1 text-sm font-medium flex justify-center  rounded-xl ${
                            item.status === "selesai"
                              ? "text-green-800 bg-green-200"
                              : item.status === "gagal"
                              ? "text-red-800 bg-red-200"
                              : "text-yellow-800 bg-yellow-200"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="py-5 mt-5">
              <ButtonHref
                href="#"
                text="Cetak Laporan"
                variant="primary"
                onClick={handlePrint}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
