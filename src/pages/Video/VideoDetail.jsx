import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config/config";
import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading.jsx";

export default function VideoDetail() {
  const { id } = useParams(); // Ambil id dari URL
  const navigate = useNavigate(); // Untuk navigasi
  const [loading, setLoading] = useState(true); // State untuk loading
  const [video, setVideo] = useState(null); // State untuk data

  // get token
  const token = sessionStorage.getItem("Token");

  // Fungsi untuk fetch berdasarkan id
  useEffect(() => {
    const fetchVideo = async () => {
      console.log(id);
      setLoading(true);
      try {
        const response = await axios.get(
          `${config.apiUrl}/getvideodetail/${id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        const data = response.data;
        setVideo(data.data);
      } catch (error) {
        showAlert({
          title: "Oppss",
          text: "Data Gagal di lihat",
          iconType: "error",
          didClose: () => {
            navigate("/video");
            window.location.reload();
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id, navigate]);

  if (loading) {
    // Tampilkan komponen loading saat data sedang diambil
    return <Loading />;
  }

  return (
    <section className="bg-white pt-10 lg:pt-28 max-w-screen-xl mx-auto">
      {video ? (
        <div className="w-full lg:w-konten mx-auto mb-10 pt-10 lg:pt-0 p-2 lg:p-0">
          {/* Video */}
          <div className="flex justify-center">
            <video
              controls
              poster={`${config.apiUrlImage}/thumb/${video.thumbnail}`}
              className="rounded-lg w-full"
            >
              <source
                src={`${config.apiUrlImage}/video/${video.video}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Judul */}
          <div className="my-10">
            <h1 className="font-bold text-3xl lg:text-4xl py-3">
              {video.judul_video}
            </h1>

            <div className="flex items-center text-gray-500">
              <i className="fa-solid fa-calendar-days me-2"></i>
              <h5 className="mt-0.5">
                {new Date(video.created_at).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </h5>
              <div className="p-1 rounded-full bg-gray-500 mx-4 mt-0.5"></div>
              <i className="fa-solid fa-user me-2 text-sm mt-0.5"></i>

              <h5 className="mt-0.5">{video.nama_lengkap}</h5>
            </div>
          </div>

          {/* Deskiripsi */}
          <div className="">
            <p
              className="text-justify mb-10"
              dangerouslySetInnerHTML={{ __html: video.deskripsi }}
            />
          </div>
        </div>
      ) : (
        <p>Data Tidak Ada</p>
      )}
    </section>
  );
}
