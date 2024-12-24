import { useEffect, useState } from "react";
import ButtonHref from "../../components/Button/ButtonHref";
import CardOlahan from "../../components/Card/CardOlahan";
import TambahLimbah from "../../components/Modal/TambahLimbah";
import config from "../../config/config";
import axios from "axios";
import Paginationhasil from "../../components/Pagination/Paginationhasil";
import ImageImport from "../../data/ImageImport";

export default function HasilOlahan() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [limbahListolah, setLimbahListolah] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const token = sessionStorage.getItem("Token");
      if (!token) {
        console.error("Token tidak ditemukan. Silakan login ulang.");
        return;
      }

      try {
        const response = await axios.get(`${config.apiUrl}/olahan`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setLimbahListolah(response.data);
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = limbahListolah.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(limbahListolah.length / itemsPerPage);

  return (
    <div>
      <div className="w-full h-full rounded-md border-2 border-black p-5">
        <div className="bg-white w-full rounded-md">
          <div className="flex justify-center">
            <h1 className="font-bold text-3xl py-2">Hasil Olahan Limbah</h1>
          </div>

          <div className="limbah-box pt-8 grid lg:grid-cols-3 sm:grid-cols-1 gap-4 pb-14">
            {loading ? (
              <p>Loading...</p>
            ) : (
              currentItems.map((olahan) => (
                <CardOlahan
                  key={olahan.id}
                  id={olahan.riwayat_id}
                  img={
                    olahan.gambar_olahan
                      ? `${config.apiUrlImage}/uploads/${olahan.gambar_olahan}`
                      : ImageImport.gambar
                  }
                  judul={olahan.target_olahan}
                  deskripsi={olahan.deskripsi_olahan}
                />
              ))
            )}
          </div>
          <Paginationhasil
            totalItems={limbahListolah.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              console.log("Halaman berubah ke:", page);
              setCurrentPage(page);
            }}
          />
        </div>
      </div>
    </div>
  );
}
