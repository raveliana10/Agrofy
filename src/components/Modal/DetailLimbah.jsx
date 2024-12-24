import ButtonHref from "../../components/Button/ButtonHref";
import { useState } from "react";
import axios from "axios"; // Import Axios
import config from "../../config/config";
import ImageImport from "../../data/ImageImport";
import { showAlert } from "../../components/SweetAlert/SweetAlert.js";

const DetailLimbah = ({
  isOpen,
  onClose,
  title,
  imgs,
  date,
  deskripsi,
  idLimbah,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newTitle, setNewTitle] = useState(title);
  const [newDeskripsi, setNewDeskripsi] = useState(deskripsi);
  const [newImage, setNewImage] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState(imgs);

  if (!isOpen) return null;

  const isChanged =
    newTitle !== title || newDeskripsi !== deskripsi || newImage !== null;

  const handleDelete = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("Token"); // Get the token from sessionStorage

    try {
      const response = await axios.delete(
        `${config.apiUrl}/limbah/${idLimbah}`,
        {
          headers: {
            Authorization: `${token}`, // Add token to the Authorization header
          },
        }
      );

      if (response.status === 200) {
        showAlert({
          title: "Berhasil",
          text: "Limbah berhasil dihapus!",
          iconType: "success",
          didClose: onClose, // Tutup modal setelah alert ditutup
        });
        setTimeout(() => {
          window.location.reload(); // Refresh halaman setelah 4 detik
        }, 2500); // Close the modal after deletion
      } else {
        setError(response.data.msg || "Gagal menghapus limbah.");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghapus limbah.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!isChanged) {
      showAlert({
        title: "Tidak ada perubahan",
        text: "Silakan ubah data sebelum memperbarui.",
        iconType: "warning", // Gunakan ikon peringatan
      });
      return; // Jangan lanjutkan jika tidak ada perubahan
    }

    setLoading(true);
    const token = sessionStorage.getItem("Token");

    const formData = new FormData();
    formData.append("nama_limbah", newTitle || ""); // Set to empty string if empty
    formData.append("deskripsi", newDeskripsi || ""); // Set to empty string if empty
    if (newImage) {
      formData.append("gambar", newImage); // Only append new image if present
    }

    try {
      const response = await axios.put(
        `${config.apiUrl}/limbah/${idLimbah}`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data", // Ensure multipart for file upload
          },
        }
      );

      if (response.status === 200) {
        showAlert({
          title: "Berhasil",
          text: "Limbah berhasil diperbarui!",
          iconType: "success",
          didClose: onClose, // Tutup modal setelah alert ditutup
        });
        setTimeout(() => {
          window.location.reload(); // Refresh halaman setelah 4 detik
        }, 2500); // Close the modal after updating
      } else {
        setError(response.data.msg || "Gagal memperbaharui limbah.");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat memperbaharui limbah.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewImage(file);
      setNewImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-md p-5 w-full mx-1 lg:w-2/4 shadow-lg relative">
        <button
          className="absolute top-4 right-5 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h2 className="text-xl font-semibold mb-8 text-center">
          Detail Limbah
        </h2>

        <div className="lg:flex gap-6 mb-6">
          {/* Foto Limbah */}
          <div className="lg:w-1/3 w-full">
            <img
              src={newImagePreview || ImageImport.gambar}
              className="w-full h-[250px] object-cover bg-gray-400 rounded-md"
              alt="Preview"
              onClick={() => document.getElementById("imageInput").click()} // Trigger file input
            />
            <input
              id="imageInput"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* Informasi Limbah */}
          <div className="lg:w-2/3 w-full">
            <h1 className="font-semibold pb-2">Nama Limbah</h1>
            <input
              type="text"
              className="h-14 w-full mb-4 rounded-lg border border-gray-300 p-2"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />

            <h1 className="font-semibold pb-2">Deskripsi</h1>
            <textarea
              name="deskripsi"
              className="w-full h-[150px] border border-gray-300 rounded-lg p-2 mb-4"
              value={newDeskripsi}
              onChange={(e) => setNewDeskripsi(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="flex justify-between gap-2">
          <ButtonHref
            text="Perbaharui"
            variant="primary"
            onClick={handleEdit}
          />
          <button
            className="w-full m-1 text-white bg-red-500 border border-red hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={handleDelete}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailLimbah;
