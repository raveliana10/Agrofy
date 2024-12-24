import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/config";

const ModalNotif = ({ isModalVisibleNotif, toggleModalNotif, setHasNotifications }) => {
  const [notifications, setNotifications] = useState([]);

  // Fungsi untuk memformat tanggal menjadi DD-MM-YYYY
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Mengambil data notifikasi dari API
  useEffect(() => {
    if (isModalVisibleNotif) {
      const token = sessionStorage.getItem("Token");
      if (!token) {
        console.error("Token tidak ditemukan. Silakan login ulang.");
        return;
      }

      axios
        .get(`${config.apiUrl}/notifikasi`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          const notifs = response.data.notifications || [];
          setNotifications(notifs);
          setHasNotifications(notifs.length > 0);
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
          setHasNotifications(false);
        });
    }
  }, [isModalVisibleNotif, setHasNotifications]);

  // Fungsi untuk menghapus semua notifikasi
  const handleDeleteAll = async () => {
    const token = sessionStorage.getItem("Token");
    if (!token) {
      console.error("Token tidak ditemukan. Silakan login ulang.");
      return;
    }

    try {
      await axios.delete(`${config.apiUrl}/notifikasi`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setNotifications([]);
      setHasNotifications(false); // Update status notifikasi
      console.log("Semua notifikasi berhasil dihapus.");
    } catch (error) {
      console.error("Error deleting notifications:", error);
    }
  };

  return (
    isModalVisibleNotif && (
      <div className="bg-white shadow-lg rounded-lg fixed z-50 p-2 top-[17.5rem] md:top-[4rem] md:right-10 w-full md:w-[35%] h-[45%]">
        <h1 className="border-b-2 py-3 text-lg font-semibold flex justify-between">
          <span>Notifikasi</span>
          <button
            onClick={handleDeleteAll}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Hapus Semua
          </button>
        </h1>
        <div className="w-full flex flex-col justify-between text-black mt-2">
          {notifications.length > 0 ? (
            notifications.map((notif, index) => (
              <div
                key={index}
                className="border-b border-t flex justify-between items-center py-2"
              >
                <div className="w-1/2">
                  <p className="text-sm">
                    <span className="font-bold">Limbah: </span>
                    {notif.nama_limbah}
                  </p>
                  <p className="text-sm">
                    <span className="font-bold">Olahan: </span>
                    {notif.target_olahan}
                  </p>
                  <p className="my-2 text-sm">
                    Olahan anda selesai hari ini, besok tambah catatan, tenggat, atau selesaikan.
                  </p>
                  <p className="text-gray-400 text-sm">{formatDate(notif.tgl_notif)}</p>
                </div>
                <div className="w-[30%] overflow-hidden">
                  <img
                    src={`${config.apiUrlImage}/uploads/${notif.gambar}`}
                    alt="Gambar Limbah"
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No notifications found for today.</p>
          )}
        </div>
      </div>
    )
  );
};

export default ModalNotif;
