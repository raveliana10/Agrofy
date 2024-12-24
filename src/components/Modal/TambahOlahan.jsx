import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import ButtonHref from "../../components/Button/ButtonHref";
import config from "../../config/config";
import { showAlert } from "../../components/SweetAlert/SweetAlert.js";

const PengolahanLimbah = ({ isOpen, onClose }) => {
  const token = sessionStorage.getItem("Token");
  const [limbahList, setLimbahList] = useState([]);
  const [selectedLimbah, setSelectedLimbah] = useState(null);
  const [fields, setFields] = useState([
    { id: 1, catatan: "", periodeMulai: "", periodeSelesai: "" },
  ]);
  const [formData, setFormData] = useState({
    limbah_id: "",
    target_olahan: "",
    tgl_mulai: new Date().toISOString().slice(0, 10), // Automatically set to current date (without time)
    tgl_selesai: "",
    status: "proses",
  });

  // Fetch data limbah saat component mount
  useEffect(() => {
    const fetchLimbah = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/limbah`, {
          headers: {
            Authorization: `${token}`, // Include token in headers
          },
        });

        setLimbahList(response.data.data);
      } catch (error) {
        console.error("Error fetching limbah data:", error);
      }
    };

    fetchLimbah();
  }, [token]);

  // Update tgl_mulai setiap kali modal dibuka
  useEffect(() => {
    if (isOpen) {
      setFormData((prevData) => ({
        ...prevData,
        tgl_mulai: new Date().toISOString().slice(0, 10), // Update tgl_mulai saat modal dibuka tanpa jam
      }));
    }
  }, [isOpen]);

  const handleAddField = () => {
    setFields([
      ...fields,
      {
        id: fields.length + 1,
        catatan: "",
        periodeMulai: "",
        periodeSelesai: "",
      },
    ]);
  };

  const handleFieldChange = (index, fieldName, value) => {
    const updatedFields = fields.map((field, i) => {
      if (i === index) {
        // Validasi untuk periodeSelesai
        if (fieldName === "periodeSelesai" && value > formData.tgl_selesai) {
          showAlert({
            title: "Kesalahan",
            text: "Periode selesai tidak boleh lebih besar dari tenggat olahan.",
            iconType: "error",
          });
          return field; // Kembalikan field lama tanpa mengubahnya
        }
        // Validasi untuk periodeMulai
        if (fieldName === "periodeMulai" && value > formData.tgl_selesai) {
          showAlert({
            title: "Kesalahan",
            text: "Periode mulai tidak boleh lebih besar dari tenggat olahan.",
            iconType: "error",
          });
          return field; // Kembalikan field lama tanpa mengubahnya
        }
        // Validasi untuk periodeMulai agar tidak melebihi periodeSelesai
        if (fieldName === "periodeMulai" && field.periodeSelesai && value > field.periodeSelesai) {
          showAlert({
            title: "Kesalahan",
            text: "Periode mulai tidak boleh lebih besar dari periode selesai.",
            iconType: "error",
          });
          return field; // Kembalikan field lama tanpa mengubahnya
        }
        
        // Validasi untuk periodeSelesai agar tidak lebih besar dari tenggat olahan
        if (fieldName === "periodeSelesai" && value > formData.tgl_selesai) {
          showAlert({
            title: "Kesalahan",
            text: "Periode selesai tidak boleh lebih besar dari tenggat olahan.",
            iconType: "error",
          });
          return field; // Kembalikan field lama tanpa mengubahnya
        }
        
        // Validasi untuk periodeSelesai agar tidak lebih kecil dari periodeMulai
        if (fieldName === "periodeSelesai" && field.periodeMulai && value < field.periodeMulai) {
          showAlert({
            title: "Kesalahan",
            text: "Periode selesai tidak boleh lebih kecil dari periode mulai.",
            iconType: "error",
          });
          return field; // Kembalikan field lama tanpa mengubahnya
        }
  
        return { ...field, [fieldName]: value };
      }
      return field;
    });
  
    setFields(updatedFields);
  };

  const handleRemoveField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!formData.target_olahan || !formData.tgl_selesai) {
      showAlert({
        title: "Gagal",
        text: "Target olahan dan tanggal selesai wajib diisi",
        iconType: "error",
        didClose: onClose, // Tutup modal setelah alert ditutup
      });
      return; // Jangan lanjutkan eksekusi jika validasi gagal
    }

    const payload = {
      ...formData,
      catatanPeriode: fields.map((field) => ({
        tgl_mulai: field.periodeMulai,
        tgl_selesai: field.periodeSelesai,
        catatan: field.catatan,
      })),
    };

    try {
      const response = await axios.post(`${config.apiUrl}/olah`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`, // Include token in headers
        },
      });

      if (response.status === 200) {
        showAlert({
          title: "Berhasil",
          text: "Olahan berhasil ditambahkan!",
          iconType: "success",
          didClose: onClose, // Tutup modal setelah alert ditutup
        });
        setTimeout(() => {
          window.location.reload(); // Refresh halaman setelah 4 detik
        }, 2500);
      } else {
        showAlert({
          title: "Gagal",
          text: "Gagal menambahkan pengolahan limbah",
          iconType: "error",
          didClose: onClose, // Tutup modal setelah alert ditutup
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showAlert({
        title: "Gagal",
        text: "Isi form terlebih dahulu",
        iconType: "error",
        didClose: onClose, // Tutup modal setelah alert ditutup
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-md p-5 w-full mx-1 lg:w-[60%] shadow-lg relative overflow-y-auto h-[40rem]">
        <button
          className="absolute top-4 right-5 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h2 className="text-xl font-bold mb-4 pt-4 pb-3 text-center">
          Tambah Pengolahan Limbah
        </h2>
        <div className="lg:flex justify-between">
          {/* Image Preview */}
          {selectedLimbah && (
            <div className="mb-4 w-full">
              <img
                src={`${config.apiUrlImage}/uploads/${selectedLimbah.gambar}`}
                alt="Preview Limbah"
                className="w-[60%] object-cover rounded-md"
              />
            </div>
          )}
          {/* Dropdown Limbah */}
          <div className="mb-4 w-full">
            <h1 className="font-semibold">Nama Limbah</h1>
            <select
              className="h-14 w-full rounded-lg border border-gray-300 p-2"
              onChange={(e) => {
                const selected = limbahList.find(
                  (item) => item.id === parseInt(e.target.value)
                );
                setSelectedLimbah(selected);
                setFormData({ ...formData, limbah_id: e.target.value });
              }}
            >
              <option value="" hidden>
                Pilih Limbah
              </option>
              {limbahList.map((limbah) => (
                <option key={limbah.id} value={limbah.id}>
                  {limbah.nama_limbah}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Form Fields */}
        <div className="mb-4">
          <h1 className="font-semibold">Target Olahan</h1>
          <input
            type="text"
            className="h-14 w-full rounded-lg border border-gray-300 p-2"
            placeholder="Masukkan Target Olahan"
            onChange={(e) =>
              setFormData({ ...formData, target_olahan: e.target.value })
            }
          />
        </div>

        <h1 className="font-semibold">Perkiraan tanggal selesai Pengolahan</h1>
        <div className="flex gap-4 mb-4">
          <input
            type="date" // Changed to date input to remove time
            className="h-14 w-full rounded-lg border border-gray-300 p-2 hidden"
            placeholder="Tanggal Mulai"
            value={formData.tgl_mulai}
            onChange={(e) =>
              setFormData({ ...formData, tgl_mulai: e.target.value })
            }
          />
          <input
            type="date"
            className="h-14 w-full rounded-lg border border-gray-300 p-2"
            placeholder="Tanggal Selesai"
            onChange={(e) =>
              setFormData({ ...formData, tgl_selesai: e.target.value })
            }
          />
        </div>

        <h1 className="font-semibold">Catatan atau Tahapan Pengolahan</h1>

        {/* Dynamic Fields for Periode */}
        {fields.map((field, index) => (
          <div key={field.id} className="lg:flex mb-4 lg:gap-2 flex-col">
            <h1 className="text-gray-700 italic text-sm">
              *Tahapan {index + 1}
            </h1>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Catatan"
              value={field.catatan}
              onChange={(e) =>
                handleFieldChange(index, "catatan", e.target.value)
              }
            />
            <div>
              <div className="flex gap-6 items-center">
                {/* Input tanggal mulai */}
                <div className="flex flex-col">
                  <h1 className="text-gray-700 italic text-sm">
                    *tanggal mulai
                  </h1>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-gray-300 p-2"
                    value={field.periodeMulai}
                    onChange={(e) =>
                      handleFieldChange(index, "periodeMulai", e.target.value)
                    }
                  />
                </div>

                {/* Input tanggal selesai */}
                <div className="flex flex-col">
                  <h1 className="text-gray-700 italic text-sm">
                    *tanggal selesai
                  </h1>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-gray-300 p-2"
                    value={field.periodeSelesai}
                    onChange={(e) =>
                      handleFieldChange(index, "periodeSelesai", e.target.value)
                    }
                  />
                </div>

                {/* Tombol hapus */}
                {fields.length > 1 && (
                  <button
                    className="text-red-500 hover:underline items-end"
                    onClick={() => handleRemoveField(index)}
                  >
                    Hapus
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="mb-4">
          <button
            className="bg-main-green text-white px-4 py-2 rounded-lg hover:bg-main-green-hover"
            onClick={handleAddField}
          >
            + Tambah Catatan
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            className="bg-main-green text-white px-12 py-2 rounded-lg hover:bg-green-600"
            onClick={handleSubmit}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PengolahanLimbah;
