import ImageImport from "../../data/ImageImport";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";
import ModalNotif from "../modalnotifikasi/notifikasi";

export default function NavbarLogin() {
  // State untuk mengontrol tampilan modal menu bar
  const [isModalVisible, setIsModalVisible] = useState(false);
  // State untuk mengontrol tampilan modal profil
  const [isModalVisibleProfil, setIsModalVisibleProfil] = useState(false);
  // State untuk mengontrol tampilan modal notif
  const [isModalVisibleNotif, setIsModalVisibleNotif] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);

  // Fungsi untuk toggle modal menu bar
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Fungsi untuk toggle modal profil
  const toggleModalProfil = () => {
    setIsModalVisibleProfil(!isModalVisibleProfil);
  };

  // Fungsi untuk toggle modal Notif
  const toggleModalNotif = () => {
    setIsModalVisibleNotif(!isModalVisibleNotif);
  };

  const navLinkClasses = (path) =>
    `px-3 py-2  transition-all duration-300 ease-linear ${
      location.pathname === path
        ? "border-b-2 border-main-brown text-main-brown"
        : "hover:text-main-brown"
    }`;

  // ========================================================================================================= cek user
  // State untuk menyimpan informasi user
  console.log(sessionStorage.getItem("Foto"));
  const [user, setUser] = useState({
    name: sessionStorage.getItem("Nama"),
    profilePicture: sessionStorage.getItem("Foto"),
    role: sessionStorage.getItem("Role"),
  });
  const navigate = useNavigate(); // Hook untuk navigasi

  // ========================================================================================================== LOGOUT
  const handleLogout = () => {
    // Hapus data user dari localStorage dan lakukan logout
    sessionStorage.removeItem("Nama");
    sessionStorage.removeItem("Foto");
    sessionStorage.removeItem("Role");
    sessionStorage.removeItem("Token");
    setUser(null);
    // Set status isLoggedIn menjadi false di localStorage
    sessionStorage.setItem("isLoggedIn", "false");
    navigate("/");
    window.location.reload(); // Refresh halaman utama untuk memperbarui tampilan
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = sessionStorage.getItem("Token");
      if (!token) return;

      try {
        const response = await fetch(`${config.apiUrl}/notifikasi`, {
          headers: { Authorization: `${token}` },
        });
        const data = await response.json();
        // Jika ada notifikasi, ubah warna ikon menjadi biru
        setHasNotifications(
          data.notifications && data.notifications.length > 0
        );
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    // Panggil fetch saat komponen di-mount atau modal notifikasi dibuka
    fetchNotifications();
  }, []); //

  return (
    <div>
      <nav className="fixed w-full z-50 top-0 start-0 shadow-md bg-white">
        <div className="w-konten m-auto flex items-center justify-between py-3">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={ImageImport.logo} className="h-5 md:h-8" alt="Logo" />
          </a>

          <div className="w-[31rem] ml-24 hidden md:flex justify-between text-black">
            <a href="/" className={navLinkClasses("/")}>
              Home
            </a>
            <a href="/tentang_kami" className={navLinkClasses("/tentang_kami")}>
              Tentang Kami
            </a>
            <a href="/pemberdayaan" className={navLinkClasses("/pemberdayaan")}>
              Pemberdayaan
            </a>
            <a href="/komunitas" className={navLinkClasses("/komunitas")}>
              Komunitas
            </a>
          </div>

          <div className="hidden md:flex justify-end items-center w-[14.5rem] lg:w-[16rem]">
            <button onClick={toggleModalNotif} className="pt-2">
              <i
                className={`fa-solid fa-bell text-xl ${
                  hasNotifications ? "text-main-green" : "text-gray-400"
                }`}
              ></i>
            </button>
            <button onClick={toggleModalProfil}>
              <div className="flex items-center justify-between lg:ml-3">
                <div className="w-10 overflow-hidden rounded-full">
                  <img
                    src={
                      user.profilePicture &&
                      user.profilePicture !== "null" &&
                      user.profilePicture !== ""
                        ? `${config.apiUrlImage}/profile/${user.profilePicture}`
                        : ImageImport.default
                    }
                    className="w-full"
                    alt="Foto Profile"
                  />
                </div>
                <h5 className="ml-3 text-sm w-auto">{user.name}</h5>
                <i className="fa-solid fa-angle-down ml-4"></i>
              </div>
            </button>
          </div>

          {/* Menu Bar */}
          <div className="block md:hidden text-black mt-1">
            <button className="text-lg" onClick={toggleModal}>
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* modal notif */}
      <ModalNotif
        isModalVisibleNotif={isModalVisibleNotif}
        toggleModalNotif={toggleModalNotif}
        setHasNotifications={setHasNotifications} // Kirim fungsi pembaruan
      />

      {/* modal profile */}
      {isModalVisibleProfil && (
        <div className="bg-white shadow-lg fixed z-50 p-2 top-[17.5rem] md:top-[4rem] md:right-16 w-full md:w-[15%]">
          <div className="w-full flex flex-col justify-between text-black">
            <a
              href="/profile"
              className="px-3 py-2 hover:bg-main-brown hover:text-white transition-all duration-300 ease-linear border-b"
            >
              Profile
            </a>
            <a
              href={user.role === "admin" ? "/dashboard-admin" : "/dashboard"}
              className="px-3 py-2 hover:bg-main-brown hover:text-white transition-all duration-300 ease-linear border-b"
            >
              Manajemen
            </a>
            <button
              onClick={handleLogout}
              className="px-3 py-2 text-left text-red-500 hover:bg-main-brown hover:text-white transition-all duration-300 ease-linear border-b"
            >
              Keluar
            </button>
          </div>
        </div>
      )}

      {/* modal */}
      {isModalVisible && (
        <div className="fixed top-[3.3rem] left-0 bg-white w-full flex flex-col px-3 border-2 shadow-lg pt-2 pb-2 text-white transition-all duration-300 z-30">
          <a
            href="/"
            className="px-3 py-2 text-black hover:bg-main-brown hover:text-white rounded-lg transition-all duration-300 ease-linear"
          >
            Home
          </a>
          <a
            href="/tentang_kami"
            className="px-3 py-2 text-black hover:bg-main-brown hover:text-white rounded-lg transition-all duration-300 ease-linear"
          >
            Tentang Kami
          </a>
          <a
            href="/pemberdayaan"
            className="px-3 py-2 text-black hover:bg-main-brown hover:text-white rounded-lg transition-all duration-300 ease-linear"
          >
            Pemberdayaan
          </a>
          <a
            href="/komunitas"
            className="px-3 py-2 text-black hover:bg-main-brown hover:text-white rounded-lg transition-all duration-300 ease-linear"
          >
            Komunitas
          </a>

          <div className="flex md:hidden justify-between items-center w-full mt-2 px-2">
            <button onClick={toggleModalProfil}>
              <div className="flex items-center">
                <div className="w-10 h-10 overflow-hidden rounded-full">
                  <img
                    src={
                      user.profilePicture &&
                      user.profilePicture !== "null" &&
                      user.profilePicture !== ""
                        ? `${config.apiUrlImage}/profile/${user.profilePicture}`
                        : ImageImport.default
                    }
                    className="w-full"
                    alt="Foto Profile"
                  />
                </div>
                <h5 className="ml-3 text-black">{user.name}</h5>
                <i className="fa-solid fa-angle-down ml-4 text-black"></i>
              </div>
            </button>

            <button onClick={toggleModalNotif} className="pt-2">
              <i className="fa-solid fa-bell text-xl text-gray-400"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
