import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/config"; // Pastikan path sesuai
import { showAlert } from "../../components/SweetAlert/SweetAlert.js";
import dayjs from "dayjs";

const DetailOlahan = ({ isOpen, onClose, limbah, onSubmitSuccess }) => {
  const token = sessionStorage.getItem("Token");
  const [formData, setFormData] = useState({
    id: limbah?.id || "",
    limbah_id: limbah?.limbah_id || "",
    tgl_mulai: limbah?.tgl_mulai || "",
    tgl_selesai: limbah?.tgl_selesai || "",
    status: limbah?.status || "proses",
  });
  const [fields, setFields] = useState(
    limbah?.catatanPeriode || [
      { id: 1, catatan: "", periodeMulai: "", periodeSelesai: "" },
    ]
  );

  const isDisabled =
    formData.status === "selesai" || formData.status === "gagal";

  useEffect(() => {
    if (isOpen && limbah) {
      setFormData({
        id: limbah.id,
        limbah_id: limbah.limbah_id,
        target_olahan: limbah.target_olahan,
        tgl_mulai: limbah.tgl_mulai
          ? dayjs(limbah.tgl_mulai).format("YYYY-MM-DD")
          : "", // Format ke YYYY-MM-DD
        tgl_selesai: limbah.tgl_selesai
          ? dayjs(limbah.tgl_selesai).format("YYYY-MM-DD")
          : "",
        status: limbah.status,
      });

      setFields(
        limbah.catatanPeriode?.map((item) => ({
          id: item.id,
          catatan: item.catatan,
          periodeMulai: item.tgl_mulai
            ? dayjs(item.tgl_mulai).format("YYYY-MM-DD")
            : "",
          periodeSelesai: item.tgl_selesai
            ? dayjs(item.tgl_selesai).format("YYYY-MM-DD")
            : "",
        })) || [{ id: 1, catatan: "", periodeMulai: "", periodeSelesai: "" }]
      );
    }
  }, [isOpen, limbah]);

  const handleAddField = () => {
    setFields([
      ...fields,
      {
        id: fields.length + 1,
        catatan: "",
        periodeMulai: "",
        periodeSelesai: "",
      },
    ]);
  };

  const handleFieldChange = (index, fieldName, value) => {
    const updatedFields = fields.map((field, i) => {
      if (i === index) {
        // Validasi untuk periodeSelesai
        if (fieldName === "periodeSelesai" && value > formData.tgl_selesai) {
          showAlert({
            title: "Kesalahan",
            text: "Periode selesai tidak boleh lebih besar dari tenggat olahan.",
            iconType: "error",
          });
          return field; // Kembalikan field lama tanpa mengubahnya
        }
        // Validasi untuk periodeMulai
                if (fieldName === "periodeMulai" && value > formData.tgl_selesai) {
                  showAlert({
                    title: "Kesalahan",
                    text: "Periode mulai tidak boleh lebih besar dari tenggat olahan.",
                    iconType: "error",
                  });
                  return field; // Kembalikan field lama tanpa mengubahnya
                }
        // Validasi untuk periodeMulai agar tidak melebihi periodeSelesai
       if (fieldName === "periodeMulai" && field.periodeSelesai && value > field.periodeSelesai) {
                 showAlert({
                   title: "Kesalahan",
                   text: "Periode mulai tidak boleh lebih besar dari periode selesai.",
                   iconType: "error",
                 });
                 return field; // Kembalikan field lama tanpa mengubahnya
               }
               
               // Validasi untuk periodeSelesai agar tidak lebih besar dari tenggat olahan
               if (fieldName === "periodeSelesai" && value > formData.tgl_selesai) {
                 showAlert({
                   title: "Kesalahan",
                   text: "Periode selesai tidak boleh lebih besar dari tenggat olahan.",
                   iconType: "error",
                 });
                 return field; // Kembalikan field lama tanpa mengubahnya
               }
               
               // Validasi untuk periodeSelesai agar tidak lebih kecil dari periodeMulai
               if (fieldName === "periodeSelesai" && field.periodeMulai && value < field.periodeMulai) {
                 showAlert({
                   title: "Kesalahan",
                   text: "Periode selesai tidak boleh lebih kecil dari periode mulai.",
                   iconType: "error",
                 });
                 return field; // Kembalikan field lama tanpa mengubahnya
               }
         
               return { ...field, [fieldName]: value };
             }
             return field;
           });
         
           setFields(updatedFields);
  };

  const handleRemoveField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const isDataUnchanged =
      formData.target_olahan === limbah.target_olahan &&
      formData.tgl_mulai === limbah.tgl_mulai &&
      formData.tgl_selesai === limbah.tgl_selesai &&
      formData.status === limbah.status &&
      JSON.stringify(fields) === JSON.stringify(limbah.catatanPeriode);

    if (isDataUnchanged) {
      showAlert({
        title: "Tidak Ada Perubahan",
        text: "Tidak ada perubahan yang dilakukan.",
        iconType: "warning",
      });
      return;
    }

    const payload = {
      id: formData.id,
      limbah_id: formData.limbah_id,
      target_olahan: formData.target_olahan,
      tgl_mulai: formData.tgl_mulai,
      tgl_selesai: formData.tgl_selesai,
      status: formData.status,
      catatanPeriode: fields.map((field) => ({
        tgl_mulai: field.periodeMulai,
        tgl_selesai: field.periodeSelesai,
        catatan: field.catatan,
      })),
    };

    try {
      const token = sessionStorage.getItem("Token");

      const response = await axios.put(
        `${config.apiUrl}/olah/${formData.id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        showAlert({
          title: "Berhasil",
          text: "Olahan berhasil diperbarui!",
          iconType: "success",
          didClose: onClose, // Tutup modal setelah alert ditutup
        });
        setTimeout(() => {
          window.location.reload(); // Refresh halaman setelah 4 detik
        }, 2500); // Tutup modal
      } else {
        alert(response.data.msg || "Terjadi kesalahan.");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan data.");
      console.error(error); // Log error untuk debugging
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-8 rounded-lg w-full mx-1 lg:w-[60%] overflow-y-auto h-[40rem]">
        <button
          className="absolute top-4 right-5 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h2 className="text-xl font-semibold mb-8 text-center">
          Edit Pengolahan Limbah
        </h2>

        <div className="lg:flex justify-between mb-6 gap-x-8">
          {/* Preview Gambar Limbah */}
          {limbah && (
            <div className="lg:w-1/4 w-full mb-4">
              <img
                src={`${config.apiUrlImage}/uploads/${limbah.gambar}`}
                alt={`Limbah ${formData.id}`}
                className="w-full max-w-sm object-cover rounded-md"
              />
            </div>
          )}

          <div className="lg:w-3/4 w-full">
            {/* Nama Limbah */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Nama Limbah</label>
              <p className="mt-2 text-gray-900">
                {limbah?.nama_limbah || "Nama limbah tidak tersedia"}
              </p>
            </div>

            {/* Target Olahan */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">
                Target Olahan
              </label>
              <input
                type="text"
                value={formData.target_olahan}
                onChange={(e) =>
                  setFormData({ ...formData, target_olahan: e.target.value })
                }
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                disabled={isDisabled}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">
            Tenggat Proses Pengolahan
          </label>
          <input
            type="date"
            value={formData.tgl_selesai}
            onChange={(e) =>
              setFormData({ ...formData, tgl_selesai: e.target.value })
            }
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            disabled={isDisabled}
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">
            Status Pengolahan
          </label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="proses">Proses</option>
            <option value="selesai">Selesai</option>
            <option value="gagal">Gagal</option>
          </select>
        </div>

        {/* Catatan Periode */}
        <div className="mb-4">
          {fields.map((field, index) => (
            <div key={index} className="mb-4">
              <div className="lg:flex mb-4 lg:gap-2 flex-col">
                <div className="w-full">
                  <label className="block text-sm font-semibold">
                    Catatan {index + 1}
                  </label>
                  <input
                    type="text"
                    value={field.catatan}
                    onChange={(e) =>
                      handleFieldChange(index, "catatan", e.target.value)
                    }
                    className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                    disabled={isDisabled}
                  />
                </div>

                <div className="flex lg:flex-row flex-col">
                  <div className="lg:w-1/3 mt-3 lg:mt-0 lg:me-2">
                    <label className="block text-sm font-semibold">
                      Tanggal Mulai
                    </label>
                    <input
                      type="date"
                      value={field.periodeMulai}
                      onChange={(e) =>
                        handleFieldChange(index, "periodeMulai", e.target.value)
                      }
                      className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                      disabled={isDisabled}
                    />
                  </div>

                  <div className="lg:w-1/3 mt-3 lg:mt-0 lg:me-2">
                    <label className="block text-sm font-semibold">
                      Tanggal Selesai
                    </label>
                    <input
                      type="date"
                      value={field.periodeSelesai}
                      onChange={(e) =>
                        handleFieldChange(
                          index,
                          "periodeSelesai",
                          e.target.value
                        )
                      }
                      className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                      disabled={isDisabled}
                    />
                  </div>

                  <button
                    onClick={() => handleRemoveField(index)}
                    className="text-red-500 text-sm mt-7"
                    disabled={isDisabled}
                  >
                    Remove Field
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={handleAddField}
            className="bg-main-green text-white p-2 rounded-md mt-2 mb-5 lg:mb-0 hover:bg-main-green-hover"
            disabled={isDisabled}
          >
            + Tambah Catatan
          </button>
        </div>

        {/* Submit and Close buttons */}
        <div className="flex justify-end space-x-2">
          {/* <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 p-2 rounded-md hover:bg-gray-400 px-5"
          >
            Close
          </button> */}
          <button
            onClick={handleSubmit}
            className="bg-main-green text-white p-2 rounded-md hover:bg-main-green-hover px-12"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailOlahan;
