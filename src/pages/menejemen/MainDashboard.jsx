import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import ButtonHref from "../../components/Button/ButtonHref";
import CardLimbah from "../../components/Card/CardLimbah";
import ImageImport from "../../data/ImageImport";
import Tabledash from "../../components/Tabledash/Tabledash";
import config from "../../config/config"; // Import konfigurasi

export default function MainDashboard() {
  const [limbahList, setLimbahList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil data dari backend menggunakan axios
    const fetchData = async () => {
      const token = sessionStorage.getItem("Token"); // Ambil token dari sessionStorage
      if (!token) {
        alert("Token tidak ditemukan. Silakan login ulang.");
        return;
      }

      try {
        const response = await axios.get(`${config.apiUrl}/limbah`, {
          headers: {
            Authorization: `${token}`, // Tambahkan token ke header Authorization
          },
        });

        if (response.status === 200) {
          setLimbahList(response.data.data); // Sesuaikan dengan struktur respons
        } else {
          console.error("Error:", response.data.msg);
        }
      } catch (error) {
        console.error(
          "Error fetching limbah data:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Ambil maksimal 3 data
  const limitedLimbahList = limbahList.slice(0, 3);

  return (
    <div>
      <div className="w-full rounded-md space-y-5">
        {/* Limbah */}
        <div className="bg-white w-full rounded-md border-2 border-black">
          <p className="flex justify-center text-3xl p-5 font-bold">
            Data Limbah
          </p>

          {/* Render Card Dinamis */}
          <div className="limbah-box py-2 grid lg:grid-cols-3 grid-cols-1 gap-4 lg:px-5 px-1">
            {loading ? (
              <p>Loading...</p>
            ) : (
              limitedLimbahList.map((limbah) => (
                <CardLimbah
                  key={limbah.id}
                  id={limbah.id}
                  img={
                    limbah.gambar
                      ? `${config.apiUrlImage}/uploads/${limbah.gambar}` // Gunakan base URL dari konfigurasi
                      : "/default-image.jpg"
                  } // Gambar default jika tidak ada
                  judul={limbah.nama_limbah}
                  deskripsi={limbah.deskripsi}
                />
              ))
            )}
          </div>

          <div className="w-full lg:px-[30%] sm:px-10 py-5 flex justify-center">
            <ButtonHref
              href="/dashboard/data_limbah"
              text="Lihat Selengkapnya"
              variant="primary"
            />
          </div>
        </div>

        {/* Proses */}
        <div className="bg-white w-full h-[48%] rounded-md px-5 border-2 border-black pb-5">
          <div className="lg:py-0">
            <p className="flex justify-center text-3xl py-5 mb-5 font-bold">
              Proses Pengolahan Limbah
            </p>
            <Tabledash />
          </div>
        </div>
      </div>
    </div>
  );
}
