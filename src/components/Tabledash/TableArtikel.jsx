import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonSubmit from "../../components/Button/ButtonSubmit";
import { showAlert } from "../SweetAlert/SweetAlert";
import axios from "axios";
import config from "../../config/config";
import Loading from "../../components/Loading/Loading.jsx";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function TableArtikel({ artikels }) {
  // State untuk loading
  const [loading, setLoading] = useState(false);
  //  navigation
  const navigate = useNavigate();
  //Set Modal Detail
  const [showModalDetail, setShowModalDetail] = useState(false);
  // Set Modal Update
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  // Set Modal Hapus
  const [showModalHapus, setShowModalHapus] = useState(false);
  // set variabel
  const [kategori, setKategori] = useState([]);
  const [selectArtikel, setSelectArtikel] = useState([]);
  // set state inputan
  const [deskripsi, setDeskripsi] = useState(selectArtikel.deskripsi);
  const [thumbnail, setThumbnail] = useState(null);

  // get token
  const token = sessionStorage.getItem("Token");

  // Jika selectArtikel.deskripsi sudah ada, pastikan deskripsi memiliki nilai default
  useEffect(() => {
    setDeskripsi(selectArtikel.deskripsi || "");
  }, [selectArtikel]);

  // =================================================================================================== Fungsi GET API Kategori
  const fetchKategori = async (page = 1) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${config.apiUrl}/getkategori?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const data = response.data;
      setKategori(data.data); // Set data dari api untuk tabel
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKategori();
  }, []);

  // =================================================================================================== detail
  async (artikel) => {
    // Set the loading state
    setLoading(true);
    try {
      // Fetch article details from the backend
      const response = await axios.get(
        `${config.apiUrl}/getartikeldetail/${artikel.id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSelectArtikel(response.data);
      setShowModalDetail(true); // Show the modal
    } catch (error) {
      showAlert({
        title: "Oppss",
        text: "Data Gagal di lihat",
        iconType: "error",
        didClose: () => {
          // Redirect setelah alert ditutup
          navigate("/dashboard-admin/artikel-admin");
          window.location.reload();
        },
      });
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  // =================================================================================================== Update
  const handleUpdateArtikel = async (e) => {
    setLoading(true);
    e.preventDefault();

    // Menggunakan FormData untuk mengirim data multipart/form-data
    const formData = new FormData();
    formData.append("judul", selectArtikel.judul_artikel);
    formData.append("deskripsi", deskripsi);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
    formData.append("kategori_id", selectArtikel.kategori_id);

    try {
      await axios.put(
        `${config.apiUrl}/updateartikel/${selectArtikel.id}`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      showAlert({
        title: "Hore",
        text: "Artikel Berhasil Diupdate",
        iconType: "success",
        didClose: () => {
          // Redirect setelah alert ditutup
          navigate("/dashboard-admin/artikel-admin");
          window.location.reload();
        },
      });
      setShowModalUpdate(false);
    } catch (error) {
      console.error("Error:", error);
      // Menangani error yang dikirimkan oleh server
      let errorMessage = "Artikel Gagal Diupdate";

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
          navigate("/dashboard-admin/artikel-admin");
          window.location.reload();
        },
      });
      setShowModalUpdate(false);
    } finally {
      setLoading(false);
    }
  };

  // =================================================================================================== Hapus
  const handelHapusArtikel = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.delete(`${config.apiUrl}/deleteartikel/${selectArtikel.id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      showAlert({
        title: "Hore",
        text: "Artikel Berhasil Dihapus",
        iconType: "success",
        didClose: () => {
          navigate("/dashboard-admin/artikel-admin");
          window.location.reload();
        },
      });
      setShowModalHapus(false);
    } catch (error) {
      console.error("Error:", error);
      // Menangani error yang dikirimkan oleh server
      let errorMessage = "Artikel Gagal Dihapus";

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
          navigate("/dashboard-admin/artikel-admin");
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
              Judul Artikel
            </th>
            <th className="py-3 px-6 text-left text-gray-700 font-medium">
              Gambar Artikel
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
          {artikels && artikels.length > 0 ? (
            artikels.map((artikel, index) => (
              <tr key={artikel.id} className="border">
                <td className="py-3 px-6 text-gray-600">{index + 1}</td>
                <td className="py-3 px-6 text-gray-600">
                  {artikel.judul_artikel}
                </td>
                <td className="py-3 px-6 text-gray-600">
                  {/* Link untuk gambar */}
                  <a
                    href={`${config.apiUrlImage}/artikel/${artikel.thumbnail}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    lihat Gambar
                  </a>
                </td>
                <td className="py-3 px-6 text-gray-600">
                  {/* Format Date */}
                  {new Date(artikel.created_at).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="py-3 px-6 text-gray-600">
                  {/* Format Date */}
                  {new Date(artikel.updated_at).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </td>

                <td className="py-3 px-6 text-gray-600">
                  <button
                    className="px-3 py-1 text-sm m-1 text-white bg-[#FFB82E] rounded mr-2"
                    onClick={() => {
                      setSelectArtikel(artikel);
                      setShowModalDetail(true);
                    }}
                  >
                    Lihat Detail
                  </button>

                  <button
                    className="px-3 py-1 text-sm m-1 text-white bg-green-500 rounded hover:bg-green-600 mr-2"
                    onClick={() => {
                      setSelectArtikel(artikel);
                      setShowModalUpdate(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="px-3 py-1 text-sm m-1 text-white bg-red-500 rounded hover:bg-red-600"
                    onClick={() => {
                      setSelectArtikel(artikel);
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

      {/* Modal Detail */}
      {showModalDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-full max-w-lg mx-4 lg:mx-0 lg:max-w-7xl overflow-y-auto max-h-[80vh]">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Detail Artikel</h3>
              <button onClick={() => setShowModalDetail(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Article Details */}
            <div className="mt-6">
              <h4 className="text-2xl font-bold py-3">
                {selectArtikel.judul_artikel}
              </h4>

              <div className="mt-4 p-1 h-[40rem] w-full">
                {selectArtikel.thumbnail && (
                  <img
                    src={`${config.apiUrlImage}/artikel/${selectArtikel.thumbnail}`}
                    alt={selectArtikel.judul_artikel}
                    className="w-full h-full rounded-lg"
                  />
                )}
              </div>

              <p
                className="mt-4 text-gray-600 text-justify"
                dangerouslySetInnerHTML={{ __html: selectArtikel.deskripsi }}
              />

              <div className="mt-6">
                <span className="text-sm text-gray-500">
                  Kategori: {selectArtikel.nama_kategori}
                </span>
                <br />
                <span className="text-sm text-gray-500">
                  Diupload :{" "}
                  {new Date(selectArtikel.created_at).toLocaleDateString(
                    "id-ID"
                  )}
                </span>
                <br />
                <span className="text-sm text-gray-500">
                  Diupdated:{" "}
                  {new Date(selectArtikel.updated_at).toLocaleDateString(
                    "id-ID"
                  )}
                </span>
                <br />
                <span className="text-sm text-gray-500">
                  Oleh: {selectArtikel.nama_lengkap}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Update Artikel */}
      {showModalUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-full max-w-lg mx-4 lg:mx-0 lg:max-w-5xl overflow-y-auto max-h-[80vh]">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Update Artikel</h3>
              <button onClick={() => setShowModalUpdate(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Form Update Artikel */}
            <div className="mt-6">
              <form
                onSubmit={handleUpdateArtikel}
                encType="multipart/form-data"
              >
                {/* Input Judul Artikel */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="judul"
                  >
                    Judul Artikel
                  </label>
                  <input
                    id="judul"
                    type="text"
                    className="border border-gray-300 rounded-lg w-full p-2"
                    value={selectArtikel.judul_artikel}
                    onChange={(e) =>
                      setSelectArtikel({
                        ...selectArtikel,
                        judul_artikel: e.target.value,
                      })
                    }
                    placeholder="Masukkan judul artikel"
                    required
                  />
                </div>

                {/* CKEditor untuk Deskripsi */}
                <div className="mt-4 max-h-[600px] overflow-y-auto">
                  <label className="block mb-2 text-sm font-medium text-black">
                    Deskripsi
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    config={{
                      toolbar: ["bold", "italic", "undo", "redo"],
                    }}
                    data={deskripsi}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setDeskripsi(data);
                    }}
                  />
                </div>

                {/* Input Thumbnail */}
                <div className="mt-4">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="thumbnail"
                  >
                    Thumbnail (Opsional)
                  </label>
                  <input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                  />
                </div>

                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-black">
                    Kategori
                  </label>
                  <select
                    className="bg-gray-50 border border-stroke-gray text-black rounded-lg block w-full p-2.5"
                    value={selectArtikel.kategori_id}
                    onChange={(e) =>
                      setSelectArtikel({
                        ...selectArtikel,
                        kategori_id: e.target.value,
                      })
                    }
                  >
                    <option value="" hidden>
                      {selectArtikel.nama_kategori}
                    </option>

                    {kategori.map((kategoriItem) => (
                      <option key={kategoriItem.id} value={kategoriItem.id}>
                        {kategoriItem.nama_kategori}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tombol Submit */}
                <div className="mt-6 w-40 m-auto">
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
                  {selectArtikel.judul_artikel}
                </span>
              </h1>

              <form onSubmit={handelHapusArtikel}>
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
