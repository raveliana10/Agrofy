import CardVideo from "../../components/Card/CardVideo";
import Pagination from "../../components/Pagination/Pagination";
import Search from "../../components/Search/Search";
import Loading from "../../components/Loading/Loading.jsx";
import axios from "axios";
import config from "../../config/config";
import React, { useState, useEffect } from "react";

export default function VideoList() {
  // set variabel
  // State untuk loading
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalData: 0,
  });

  // get token
  const token = sessionStorage.getItem("Token");

  // =================================================================================================== Fungsi GET API Video
  const fetchVideo = async (page = 1, searchQuery = "") => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${config.apiUrl}/getvideo?page=${page}&limit=10&search=${searchQuery}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const data = response.data;
      console.log(data);
      setVideo(data.data); // Set data dari api untuk tabel
      setPagination(data.pagination); // Set data pagination dari api untuk pagination
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  const handleSearch = (searchQuery) => {
    fetchVideo(1, searchQuery); // Ambil data dengan query pencarian
  };

  return (
    <section className="pt-20 bg-white max-w-screen-xl mx-auto">
      <div className="w-konten mx-auto p-2 mb-10">
        <h1 className="text-black text-3xl lg:text-4xl font-bold mt-10 mb-5 text-center py-4">
          Video Pemberdayaan
        </h1>

        <p className="w-full lg:w-[80%] m-auto text-center text-sm md:text-base">
          Video-video informatif tentang pengolahan limbah. Temukan langkah
          praktis dan solusi kreatif untuk mendukung keberlanjutan lingkungan
          melalui inovasi pengolahan limbah pertanian yang efisien.
        </p>

        {/* Search */}
        <div className="w-full lg my-10">
          <Search placeholder="Cari video..." onSearch={handleSearch} />
        </div>

        {/* Card */}
        <div className="flex flex-col lg:flex-row flex-wrap w-full justify-around gap-4">
          {loading ? (
            <Loading />
          ) : video && video.length > 0 ? (
            video.map((data) => (
              <CardVideo
                key={data.id}
                img={`${config.apiUrlImage}/thumb/${data.thumbnail}`}
                judul={data.judul_video}
                kategori={data.nama_kategori}
                deskripsi={data.deskripsi}
                href={`/video_detail/${data.id}`}
              />
            ))
          ) : (
            <p className="text-center italic text-gray-400">Belum Ada Video</p>
          )}
        </div>

        {/* Pagination */}
        <div className=" w-full flex justify-center my-10">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalData={pagination.totalData}
            fetchData={fetchVideo}
          />
        </div>
      </div>
    </section>
  );
}
