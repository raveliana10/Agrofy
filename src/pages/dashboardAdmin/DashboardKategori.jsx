import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../../components/Sidebar/SidebarAdmin";
import TableKategori from "../../components/Tabledash/TableKategori";
import Pagination from "../../components/Pagination/Pagination";
import axios from "axios";
import config from "../../config/config";
import Search from "../../components/Search/Search";
import ButtonHref from "../../components/Button/ButtonHref";
import ButtonSubmit from "../../components/Button/ButtonSubmit";
import { showAlert } from "../../components/SweetAlert/SweetAlert";
import Loading from "../../components/Loading/Loading.jsx";

export default function DashboardKategori() {
  // State untuk loading
  const [loading, setLoading] = useState(false);
  //  navigation
  const navigate = useNavigate();
  // menu bar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // set modal tambah
  const [showModalTambah, setShowModalTambah] = useState(false);
  // set variabel
  const [kategori, setKategori] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalData: 0,
  });
  // set state inputan
  const [nama_kategori, setNamaKategori] = useState("");

  // get token
  const token = sessionStorage.getItem("Token");

  // =================================================================================================== Fungsi GET API
  const fetchKategori = async (page = 1, searchQuery = "") => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${config.apiUrl}/getkategori?page=${page}&limit=10&search=${searchQuery}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const data = response.data;
      setKategori(data.data); // Set data dari api untuk tabel
      setPagination(data.pagination); // Set data pagination dari api untuk pagination
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKategori();
  }, []);

  // Fungsi untuk menangani pencarian
  const handleSearch = (searchQuery) => {
    fetchKategori(1, searchQuery); // Ambil data dengan query pencarian
  };

  // =================================================================================================== Tambah
  const handelTambahKategori = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `${config.apiUrl}/tambahkategori`,
        {
          nama_kategori,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      showAlert({
        title: "Hore",
        text: "Kategori Berhasil Ditambah",
        iconType: "success",
        didClose: () => {
          // Redirect setelah alert ditutup
          navigate("/dashboard-admin/kategori-admin");
          window.location.reload();
        },
      });
      setShowModalTambah(false);
    } catch (error) {
      // Menangani error yang dikirimkan oleh server
      let errorMessage = "Kategori Gagal Ditambahh";

      if (error.response && error.response.data) {
        // Jika error dari server ada di response.data
        if (error.response.data.msg) {
          errorMessage = error.response.data.msg; // Tampilkan pesan dari server jika ada
        } else {
          errorMessage = "Terjadi kesalahan, coba lagi.";
        }
      } else if (error.message) {
        // Jika error tidak ada response dari server
        errorMessage = error.message;
      }

      // Menampilkan alert dengan pesan error spesifik
      showAlert({
        title: "Oppss",
        text: `${errorMessage}`,
        iconType: "error",
        didClose: () => {
          navigate("/dashboard-admin/kategori-admin");
          window.location.reload();
        },
      });
      setShowModalTambah(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-60 flex-shrink-0 h-full hidden lg:block">
        <SidebarAdmin />
      </div>

      {/* Sidebar for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        ></div>
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform bg-gray-800 w-60 h-full transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <SidebarAdmin />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 overflow-y-auto h-full pt-24">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <div className="w-full">
            <button
              className="lg:hidden text-gray-800 bg-gray-200 p-2 rounded-md"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12h18M3 6h18M3 18h18"
                />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-700 py-3">
              Dashboard Kategori
            </h1>

            <div className="my-3">
              <Search placeholder="Cari Kategori..." onSearch={handleSearch} />
            </div>

            <div className="mt-3 py-5">
              <ButtonHref
                href="#"
                text="Tambah Kategori"
                variant="primary"
                onClick={() => setShowModalTambah(true)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <TableKategori kategoris={kategori} />
        </div>

        {/* pagination */}
        <div className="mt-5">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalData={pagination.totalData}
            fetchData={fetchKategori}
          />
        </div>
      </div>

      {/* Modal Tambah */}
      {showModalTambah && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-full max-w-lg mx-4 lg:mx-0 lg:max-w-xl overflow-y-auto max-h-[80vh]">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Tambah Kategori</h3>

              <button onClick={() => setShowModalTambah(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Form untuk Komentar Baru */}
            <div className="mt-6">
              <form onSubmit={handelTambahKategori}>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-black">
                    Nama Kategori
                  </label>
                  <input
                    type="text"
                    name="nama_kategori"
                    id="nama_kategori"
                    className="bg-gray-50 border border-stroke-gray text-black rounded-lg block w-full p-2.5 focus:ring-0 focus:outline-none focus:border-main-green"
                    placeholder="Masukan nama kategori"
                    value={nama_kategori}
                    onChange={(e) => setNamaKategori(e.target.value)}
                    required
                  />
                </div>

                <div className="flex justify-end mt-4">
                  <ButtonSubmit text="Tambah" variant="primary" />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Overlay Loading */}
      {loading && <Loading />}
    </div>
  );
}
