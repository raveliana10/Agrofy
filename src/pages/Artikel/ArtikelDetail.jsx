import Loading from "../../components/Loading/Loading.jsx";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config/config";
import React, { useState, useEffect } from "react";

export default function ArtikelDetail() {
  const { id } = useParams(); // Ambil id dari URL
  const navigate = useNavigate(); // Untuk navigasi
  const [loading, setLoading] = useState(true); // State untuk loading
  const [artikel, setArtikel] = useState(null); // State untuk data artikel

  // get token
  const token = sessionStorage.getItem("Token");

  // Fungsi untuk fetch artikel berdasarkan id
  useEffect(() => {
    const fetchArtikel = async () => {
      console.log(id);
      setLoading(true);
      try {
        const response = await axios.get(
          `${config.apiUrl}/getartikeldetail/${id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        const data = response.data;
        setArtikel(data.data);
      } catch (error) {
        showAlert({
          title: "Oppss",
          text: "Data Gagal di lihat",
          iconType: "error",
          didClose: () => {
            navigate("/artikel");
            window.location.reload();
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchArtikel();
  }, [id, navigate]);

  if (loading) {
    // Tampilkan komponen loading saat data sedang diambil
    return <Loading />;
  }

  return (
    <section className="bg-white lg:pt-28 pt-12 max-w-screen-md mx-auto">
      {artikel ? (
        <div className="w-konten m-auto">
          {/* Judul */}
          <div className="my-10">
            <h1 className="font-bold text-3xl lg:text-4xl py-3">
              {artikel.judul_artikel}
            </h1>

            <div className="mt-2 flex items-center text-gray-500">
              <i className="fa-solid fa-calendar-days me-2"></i>
              <h5 className="mt-0.5">
                {new Date(artikel.created_at).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </h5>
              <div className="p-1 rounded-full bg-gray-500 mx-4 mt-0.5"></div>
              <i className="fa-solid fa-user me-2 text-sm mt-0.5"></i>

              <h5 className="mt-0.5">{artikel.nama_lengkap}</h5>
            </div>
          </div>

          {/*Gambar*/}
          <div className="w-full h-[200px] lg:h-[400px] mb-10">
            <img
              src={`${config.apiUrlImage}/artikel/${artikel.thumbnail}`}
              className="h-full w-full"
              alt="Artikel Image"
            ></img>
          </div>

          {/*artikel*/}
          <div className="w-full">
            <p
              className="text-justify font-normal text-base mb-10"
              dangerouslySetInnerHTML={{ __html: artikel.deskripsi }}
            />
          </div>
        </div>
      ) : (
        <p>Data Tidak Ada</p>
      )}
    </section>
  );
}
