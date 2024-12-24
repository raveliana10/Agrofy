import { useState } from "react";
import ButtonHref from "../../components/Button/ButtonHref";
import axios from "axios";
import config from "../../config/config";
import { showAlert } from "../../components/SweetAlert/SweetAlert.js";
import ImageImport from "../../data/ImageImport";

const DetailHasilOlahan = ({
  isOpen,
  onClose,
  title,
  imgs,
  deskripsi,
  idHasil,
}) => {
  const [newDeskripsi, setNewDeskripsi] = useState(deskripsi);
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(imgs || ImageImport.gambar); // Store the image preview

  // Handle image file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file)); // Set the new image preview
    }
  };

  // Handle save button (upload the new image and description)
  const handleSave = async () => {
    if (!newDeskripsi && !newImage) {
      showAlert({
        title: "Tidak ada perubahan",
        text: "Tidak ada data yang diubah",
        iconType: "info",
        didClose: onClose,
      });
      return;
    }

    const formData = new FormData();
    formData.append("deskripsi_olahan", newDeskripsi || "");
    if (newImage) {
      formData.append("gambar_olahan", newImage); // Attach the new image file
    }

    try {
      const token = sessionStorage.getItem("Token");
      if (!token) {
        console.error("Token tidak ditemukan. Silakan login ulang.");
        return;
      }

      await axios.put(`${config.apiUrl}/hasilolahan/${idHasil}`, formData, {
        headers: {
          Authorization: `${token}`, // Attach token in the request header
          "Content-Type": "multipart/form-data",
        },
      });

      showAlert({
        title: "Berhasil",
        text: "Hasil Olahan berhasil diperbarui!",
        iconType: "success",
        didClose: onClose, // Tutup modal setelah alert ditutup
      });

      setTimeout(() => {
        window.location.reload(); // Refresh halaman setelah 2,5 detik
      }, 2500);
    } catch (error) {
      console.error(
        "Error updating hasil olahan:",
        error.response?.data || error.message
      );
      showAlert({
        title: "Gagal",
        text: "Terjadi kesalahan saat mengupdate data",
        iconType: "error",
        didClose: onClose,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-md p-5 w-full mx-1 lg:w-1/2 shadow-lg relative overflow-y-auto">
        <button
          className="absolute top-4 right-5 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h2 className="text-xl font-bold pt-4 text-center">
          Data Hasil Olahan
        </h2>

        <div className="flex flex-col lg:flex-row mb-4 mt-8">
          <div className="w-full lg:w-[60%]">
            <img
              src={imagePreview || ImageImport.logo}
              className="w-full h-[250px] object-cover bg-gray-400 rounded-md cursor-pointer"
              alt="Preview"
              onClick={() => document.getElementById("fileInput").click()} // Trigger file input when clicking image
            />
            <input
              id="fileInput"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="mt-5 lg:mt-0 lg:ml-4 w-full">
            <h1 className="font-semibold">Nama Hasil Olahan</h1>
            <input
              type="text"
              className="h-12 w-full mb-6 rounded-lg border border-gray-300 p-2 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
              value={title}
              disabled // Disable input field for title
            />
            <h1 className="font-semibold">Deskripsi</h1>
            <textarea
              name="deskripsi"
              className="w-full h-32 border border-gray-300 rounded-lg p-2"
              value={newDeskripsi}
              onChange={(e) => setNewDeskripsi(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 my-3">
          <ButtonHref text="Simpan" variant="primary" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default DetailHasilOlahan;
