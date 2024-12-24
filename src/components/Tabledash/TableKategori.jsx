import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonSubmit from "../../components/Button/ButtonSubmit";
import { showAlert } from "../SweetAlert/SweetAlert";
import axios from "axios";
import config from "../../config/config";
import Loading from "../../components/Loading/Loading.jsx";

export default function TableKategori({ kategoris }) {
  // State untuk loading
  const [loading, setLoading] = useState(false);
  // navigation
  const navigate = useNavigate();
  // Set Modal Update
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  // Set Modal Hapus
  const [showModalHapus, setShowModalHapus] = useState(false);
  // set variabel
  const [selectKategori, setSelectKategori] = useState(null);

  // get token
  const token = sessionStorage.getItem("Token");

  // =================================================================================================== Update
  const handelUpdateKategori = async (e) => {
    e.preventDefault();
    setLoading(true);

    // fungsi
    try {
      await axios.put(
        `${config.apiUrl}/updatekategori/${selectKategori.id}`,
        {
          nama_kategori: selectKategori.nama_kategori,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      showAlert({
        title: "Hore",
        text: "Kategori Berhasil Diupdate",
        iconType: "success",
        didClose: () => {
          // Redirect setelah alert ditutup
          navigate("/dashboard-admin/kategori-admin");
          window.location.reload();
        },
      });
      setShowModalUpdate(false);
    } catch (error) {
      console.error("Error:", error);
      // Menangani error yang dikirimkan oleh server
      let errorMessage = "Kategori Gagal Diupdate";

      if (error.response && error.response.data) {
        // Jika error dari server ada di response.data
        if (error.response.data.msg) {
          errorMessage = error.response.data.msg; // Tampilkan pesan dari server jika ada
        }
      } else {
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
      setShowModalUpdate(false);
    } finally {
      setLoading(false);
    }
  };

  // =================================================================================================== Hapus
  const handelHapusKategori = async (e) => {
    e.preventDefault();
    setLoading(true);

    // fungsi
    try {
      await axios.delete(
        `${config.apiUrl}/deletekategori/${selectKategori.id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      showAlert({
        title: "Hore",
        text: "Kategori Berhasil Dihapus",
        iconType: "success",
        didClose: () => {
          // Redirect setelah alert ditutup
          navigate("/dashboard-admin/kategori-admin");
          window.location.reload();
        },
      });
      setShowModalHapus(false);
    } catch (error) {
      console.error("Error:", error);
      // Menangani error yang dikirimkan oleh server
      let errorMessage = "Kategori Gagal Dihapus";

      if (error.response && error.response.data) {
        // Jika error dari server ada di response.data
        if (error.response.data.msg) {
          errorMessage = error.response.data.msg; // Tampilkan pesan dari server jika ada
        }
      } else {
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
      setShowModalHapus(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-left text-gray-700 font-medium">
              No
            </th>
            <th className="py-3 px-6 text-left text-gray-700 font-medium">
              Nama Kategori
            </th>
            <th className="py-3 px-6 text-left text-gray-700 font-medium">
              Ditambahkan Oleh
            </th>
            <th className="py-3 px-6 text-left text-gray-700 font-medium">
              Tanggal Dibuat
            </th>
            <th className="py-3 px-6 text-left text-gray-700 font-medium">
              Tanggal Diupdate
            </th>
            <th className="py-3 px-6 text-left text-gray-700 font-medium">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {kategoris && kategoris.length > 0 ? (
            // Perulangan
            kategoris.map((kategori, index) => (
              <tr key={kategori.id} className="border">
                <td className="py-3 px-6 text-gray-600">{index + 1}</td>
                <td className="py-3 px-6 text-gray-600">
                  {kategori.nama_kategori}
                </td>
                <td className="py-3 px-6 text-gray-600">
                  {kategori.nama_lengkap}
                </td>
                <td className="py-3 px-6 text-gray-600">
                  {/* Format Date */}
                  {new Date(kategori.created_at).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="py-3 px-6 text-gray-600">
                  {/* Format Date */}
                  {new Date(kategori.updated_at).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </td>

                <td className="py-3 px-6 text-gray-600">
                  <button
                    className="px-3 py-1 text-sm m-1 text-white bg-green-500 rounded hover:bg-green-600 mr-2"
                    onClick={() => {
                      setSelectKategori(kategori);
                      setShowModalUpdate(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 text-sm m-1 text-white bg-red-500 rounded hover:bg-red-600"
                    onClick={() => {
                      setSelectKategori(kategori);
                      setShowModalHapus(true);
                    }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center italic text-gray-400 py-5">
                Belum Ada Data
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Update */}
      {showModalUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-full max-w-lg mx-4 lg:mx-0 lg:max-w-xl overflow-y-auto max-h-[80vh]">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Update Kategori</h3>

              <button onClick={() => setShowModalUpdate(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Form */}
            <div className="mt-6">
              <form onSubmit={handelUpdateKategori}>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-black">
                    Nama Kategori
                  </label>
                  <input
                    type="nama_lengkap"
                    name="nama_lengkap"
                    id="nama_lengkap"
                    className="bg-gray-50 border border-stroke-gray text-black rounded-lg block w-full p-2.5 focus:ring-0 focus:outline-none focus:border-main-green"
                    placeholder="Masukan nama kategori"
                    value={selectKategori?.nama_kategori || ""}
                    onChange={(e) =>
                      setSelectKategori({
                        ...selectKategori,
                        nama_kategori: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="flex justify-end mt-4">
                  <ButtonSubmit text="Edit" variant="primary" />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Hapus */}
      {showModalHapus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-full max-w-lg mx-4 lg:mx-0 lg:max-w-lg overflow-y-auto max-h-[80vh]">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Hapus Kategori</h3>

              <button onClick={() => setShowModalHapus(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Form */}
            <div className="mt-6">
              <h1 className="text-center my-5">
                Apakah anda yakin menghapus{" "}
                <span className="font-semibold">
                  {selectKategori.nama_kategori}
                </span>
              </h1>

              <form onSubmit={handelHapusKategori}>
                <div className="flex justify-center mt-4">
                  <div className="w-40 me-2">
                    <button
                      onClick={() => setShowModalHapus(false)}
                      className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Batal
                    </button>
                  </div>
                  <div className="w-40">
                    <ButtonSubmit text="Hapus" variant="primary" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Overlay Loading */}
      {loading && <Loading />}
    </>
  );
}
