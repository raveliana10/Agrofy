import { useEffect, useState } from "react";
import ButtonHref from "../../components/Button/ButtonHref";
import CardLimbah from "../../components/Card/CardLimbah";
import Pagination from "../../components/Pagination/Pagination";
import TambahLimbah from "../../components/Modal/TambahLimbah";
import config from "../../config/config";
import axios from "axios";

export default function DataLimbah() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [limbahList, setLimbahList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalData: 0,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Ambil data limbah dari backend menggunakan Axios
  const fetchData = async (page = 1) => {
    setLoading(true);

    // Ambil token dari sessionStorage
    const token = sessionStorage.getItem("Token");
    if (!token) {
      console.error("Token tidak ditemukan. Silakan login ulang.");
      return;
    }

    try {
      const response = await axios.get(
        `${config.apiUrl}/limbah?page=${page}&limit=6`,
        {
          headers: {
            Authorization: `${token}`, // Tambahkan token ke header Authorization
          },
        }
      );
      setLimbahList(response.data.data); // Sesuaikan struktur respons
      setPagination(response.data.pagination); // Set data pagination dari api untuk pagination
    } catch (error) {
      console.error(
        "Error fetching limbah data:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="w-full h-full rounded-md border-2 border-black">
        <div className="bg-white w-full rounded-md">
          <div className="flex justify-between px-4">
            <h1 className="font-bold text-3xl p-5 ">Data Limbah</h1>
            <div className="p-5">
              <ButtonHref
                href="#"
                text="Tambah"
                variant="primary"
                onClick={handleOpenModal}
              />
            </div>
          </div>

          {/* Data Limbah */}
          <div className="limbah-box pt-2 grid lg:grid-cols-3 sm:grid-cols-1 gap-4 lg:px-5 px-1">
            {loading ? (
              <p>Loading...</p>
            ) : (
              limbahList.map((limbah) => (
                <CardLimbah
                  key={limbah.id}
                  id={limbah.id}
                  img={
                    limbah.gambar
                      ? `${config.apiUrlImage}/uploads/${limbah.gambar}` // Gunakan config.apiUrlImage
                      : "/default-image.jpg"
                  } // Gambar default jika tidak ada
                  judul={limbah.nama_limbah}
                  tanggalmasuk={limbah}
                  deskripsi={limbah.deskripsi}
                />
              ))
            )}
          </div>
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalData={pagination.totalData}
            fetchData={fetchData}
          />
        </div>
      </div>

      {/* Modal Component */}
      <TambahLimbah isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
