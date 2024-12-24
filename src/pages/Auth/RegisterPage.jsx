import ImageImport from "../../data/ImageImport";
import ButtonSubmit from "../../components/Button/ButtonSubmit";
import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/config";
import { showAlert } from "../../components/SweetAlert/SweetAlert.js";
import Loading from "../../components/Loading/Loading.jsx";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  // State untuk loading
  const [loading, setLoading] = useState(false);
  //  navigation
  const navigate = useNavigate();
  // State untuk fungsi eye
  const [Password, setPassword] = useState(true);
  const [KonfirmasiPassword, setKonfirmasiPassword] = useState(true);
  // Fungsi untuk toggle tipe input
  const togglePasswordVisibility = () => {
    setPassword((prevPassword) => !prevPassword);
  };
  // Fungsi untuk toggle tipe input
  const toggleKonfirmasiPasswordVisibility = () => {
    setKonfirmasiPassword((prevKonfirmasiPassword) => !prevKonfirmasiPassword);
  };
  // set variabel
  const [nama_lengkap, setNamaLengkap] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ============================================================================================== Fungsi Backend
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${config.apiUrl}/register`, {
        nama_lengkap,
        email,
        password,
        confirmPassword,
      });
      showAlert({
        title: "Horee",
        text: "Register Berhasil",
        iconType: "success",
        didClose: () => {
          navigate("/login");
          window.location.reload();
        },
      });
    } catch (error) {
      console.error("Error:", error);
      // Menangani error yang dikirimkan oleh server
      let errorMessage = "Register Gagal";

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
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg-body h-screen flex justify-center items-center">
      <div className="p-2 flex justify-between items-stretch w-full lg:w-[70%] mx-3 md:mx-24 lg:mx-0">
        {/* Kanan */}
        <div className="p-5 w-full lg:w-[60%] rounded-lg bg-white">
          <h1 className="text-xl font-semibold leading-tight tracking-tight overflow-hidden text-black md:text-2xl uppercase text-center mb-10 mt-4">
            Sign up
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
            {/* Input untuk Nama Lengkap */}
            <div>
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-medium text-black"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                name="nama_lengkap"
                id="nama_lengkap"
                className="bg-gray-50 border border-stroke-gray text-black rounded-lg block w-full p-2.5 focus:ring-0 focus:outline-none focus:border-main-green"
                placeholder="Masukan nama lengkap"
                value={nama_lengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                required
              />
            </div>

            {/* Input untuk Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-black"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-stroke-gray text-black rounded-lg block w-full p-2.5 focus:ring-0 focus:outline-none focus:border-main-green"
                placeholder="Masukan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-black"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={Password ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-stroke-gray text-black rounded-lg block w-full p-2.5 focus:ring-0 focus:outline-none focus:border-main-green"
                  value={password}
                  onChange={(e) => setpasswordInput(e.target.value)}
                  required
                />
                <span
                  className="absolute end-2.5 bottom-[8px] cursor-pointer icon"
                  onClick={togglePasswordVisibility}
                >
                  <i
                    className={`fa-regular ${
                      Password ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></i>
                </span>
              </div>
            </div>

            {/* Input untuk Konfirmasi Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-black"
              >
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={KonfirmasiPassword ? "password" : "text"} // Menyesuaikan tipe input berdasarkan kondisi Password
                  name="confirmPassword"
                  id="confirmPassword" // Mengubah id menjadi 'confirmPassword' agar unik
                  placeholder="••••••••"
                  className="bg-gray-50 border border-stroke-gray text-black rounded-lg block w-full p-2.5 focus:ring-0 focus:outline-none focus:border-main-green"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span
                  className="absolute end-2.5 bottom-[8px] cursor-pointer icon"
                  onClick={toggleKonfirmasiPasswordVisibility}
                >
                  <i
                    className={`fa-regular ${
                      KonfirmasiPassword ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></i>
                </span>
              </div>
            </div>

            {/* Checkbox untuk Persetujuan */}
            <div className="flex items-center mb-5">
              <div className="flex items-center pe-2">
                <input
                  id="agreeTerms" // Menggunakan ID unik untuk checkbox
                  type="checkbox"
                  className="w-5 h-5 rounded border border-main-green"
                  required
                />
              </div>
              <label
                htmlFor="agreeTerms"
                className="ms-3 text-sm font-medium text-black"
              >
                Aku setuju dengan{" "}
                <span className="font-bold">Persyaratan Layanan</span> dan{" "}
                <span className="font-bold">Kebijakan Privasi</span>
              </label>
            </div>

            {/* Tombol Submit */}
            <div className="w-full">
              <ButtonSubmit text="Sign Up" variant="primary" />
            </div>

            {/* Tautan ke Halaman Login */}
            <div className="flex justify-center">
              <p className="text-sm font-light">
                Sudah punya Akun?
                <a
                  href="/login"
                  className="font-medium text-blue-600 hover:underline ml-1"
                >
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Kiri */}
        <div className="hidden lg:block w-[60%] ml-2 max-h-screen">
          <img
            className="rounded-lg h-full w-full"
            src={ImageImport.register}
            alt="Register Image"
          />
        </div>
      </div>

      {/* Overlay Loading */}
      {loading && <Loading />}
    </div>
  );
}
