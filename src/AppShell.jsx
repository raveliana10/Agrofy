import Loading from "./components/Loading/Loading";
import NavbarLogin from "./components/Navbar/NavbarLogin";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { useState, useEffect } from "react";

function AppShell() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading
  const [loading, setLoading] = useState(true); // loading state untuk menunggu pengecekan status login

  // cek apakah user sudah login atau belum
  useEffect(() => {
    const userLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn); // update status login
    setLoading(false); // set loading selesai
  }, []);

  if (loading) {
    // Tampilkan loading atau spinner saat sedang memeriksa status login
    return <Loading />;
  }

  return (
    <div>
      {/* Navbar yang berubah sesuai status login */}
      {isLoggedIn ? <NavbarLogin /> : <Navbar />}
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppShell;
