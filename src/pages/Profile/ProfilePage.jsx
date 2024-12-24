import { useState, useEffect } from "react";
import ImageImport from "../../data/ImageImport";
import ButtonAction from "../../components/Button/ButtonSubmit";
import Loading from "../../components/Loading/Loading.jsx";
import axios from "axios";
import config from "../../config/config";
import { showAlert } from "../../components/SweetAlert/SweetAlert.js";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  // State untuk mengontrol tampilan modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  // State untuk loading dan notification
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");

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

  // State untuk menyimpan data pengguna
  const [user, setUser] = useState({
    nama_lengkap: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  // get token
  const token = sessionStorage.getItem("Token");

  // Fungsi untuk toggle modal
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // fungsi untuk mendapatkan data user
  const getProfile = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${config.apiUrl}/profile`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const data = response.data.data; // Ambil data pengguna

      setUser(data); // Simpan data pengguna ke state
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk memperbarui profil
  const updateProfile = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!user.nama_lengkap || !user.email) {
      setNotification("Nama dan email wajib diisi");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        `${config.apiUrl}/profile`,
        {
          nama_lengkap: user.nama_lengkap,
          email: user.email,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.data) {
        setUser({ ...user, ...response.data.data }); // Update state with new data
      }

      const data = response.data.data;
      sessionStorage.setItem("Nama", data[0].nama_lengkap),
        // Tampilkan alert untuk update sukses
        showAlert({
          title: `Success`,
          text: response.data.msg,
          iconType: "success",
          didClose: () => {
            navigate("/profile");
            window.location.reload();
          },
        });
    } catch (error) {
      console.error("Gagal mengupdate profil:", error);
      // Menangani error yang dikirimkan oleh server
      let errorMessage = "Gagal memperbarui profil. Silakan coba lagi.";

      // Menampilkan alert dengan pesan error spesifik
      showAlert({
        title: "Oppss",
        text: `${errorMessage}`,
        iconType: "error",
        didClose: () => {
          navigate("/profile");
          window.location.reload();
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk memperbarui password
  const updatePassword = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `${config.apiUrl}/profile/password`,
        {
          newPassword: user.newPassword,
          confirmPassword: user.confirmPassword,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.data) {
        setUser({ ...user, ...response.data.data }); // Update state with new data
      }

      // Tampilkan alert untuk update sukses
      showAlert({
        title: `Success`,
        text: response.data.msg,
        iconType: "success",
        didClose: () => {
          navigate("/profile");
          window.location.reload();
        },
      });
    } catch (error) {
      console.error("Gagal mengupdate password:", error);
      // Menangani error yang dikirimkan oleh server
      let errorMessage = "Gagal memperbarui password. Silakan coba lagi.";

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

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    // Reset error jika input diubah
    if (name === "newPassword" || name === "confirmPassword") {
      setErrors({ ...errors, [name]: false });
      setNotification("");
    }
  };

  const resetChanges = () => {
    getProfile(); // Ambil ulang data awal dari backend
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("foto", file);

      try {
        setLoading(true);
        const response = await axios.put(
          `${config.apiUrl}/profile/updatefoto`,
          formData,
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data) {
          // Update gambar di state user
          setUser((prevUser) => ({
            ...prevUser,
            profileImage: response.data.filePath, // Pastikan path sesuai dengan respons server
          }));

          const data = response.data.data;
          sessionStorage.setItem("Foto", data.foto),
            // Tampilkan notifikasi sukses
            showAlert({
              title: "Success",
              text: "Foto berhasil diperbarui",
              iconType: "success",
              didClose: () => {
                navigate("/profile");
                window.location.reload();
              },
            });
        }
      } catch (error) {
        console.error("Gagal mengunggah gambar:", error);

        // Tampilkan notifikasi error
        showAlert({
          title: "Oppss",
          text: "Gagal mengunggah gambar. Silakan coba lagi.",
          iconType: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return <Loading />; // Tampilkan komponen loading jika sedang memuat
  }

  return (
    <section className="bg-white pt-28">
      <div className="max-w-4xl mx-auto px-6 pb-32">
        <h1 className="font-medium text-3xl pb-10">Edit Profile</h1>

        {/* Foto Section */}
        <div className="pb-6">
          <h2 className="text-lg font-semibold">Foto</h2>
          <div className="flex items-end pt-3">
            <img
              className="w-48 rounded-lg"
              src={
                user.foto
                  ? `${config.apiUrlImage}/profile/${user.foto}`
                  : ImageImport.default
              }
              // Gambar default jika belum ada
              alt="Profile"
            />
            <div className="pl-6">
              <button
                type="button"
                className="cursor-pointer bg-main-green text-white px-4 py-2 rounded-lg hover:bg-main-green-hover"
                onClick={() => document.getElementById("fileInput").click()} // Trigger klik input file
              >
                Ubah Foto
              </button>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Username Section */}
        <div className="pb-6">
          <h2 className="text-lg font-semibold">Nama Lengkap</h2>
          <input
            type="text"
            name="nama_lengkap"
            value={user.nama_lengkap}
            onChange={handleInputChange}
            className="w-full h-10 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Username"
          />
        </div>

        {/* Email Section */}
        <div className="pb-6">
          <h2 className="text-lg font-semibold">Email</h2>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className="w-full h-10 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
          />
        </div>

        {/* Password Section */}
        <div className="pb-6">
          <h2 className="text-lg font-semibold">Password</h2>
          <div className="flex justify-between">
            <div className="relative flex-grow">
              <input
                type="password"
                name="password"
                id="password"
                className="w-full h-10 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div>
            <div className="pl-2">
              <button
                onClick={toggleModal}
                className="bg-gray-200 p-2 px-3 rounded-lg hover:bg-gray-300"
              >
                Ubah Kata Sandi
              </button>
            </div>
          </div>
        </div>

        {/* Tombol Reset dan Simpan */}
        <div className="flex justify-center md:justify-between pt-10 w-full">
          <button
            onClick={resetChanges}
            className="w-[30%] mx-1 md:mx-0 md:w-[48%] bg-gray-200 p-3 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-all duration-300"
          >
            Reset
          </button>
          <button
            onClick={updateProfile}
            className="w-[30%] mx-1 md:mx-0 md:w-[48%] bg-main-green p-3 rounded-lg text-sm font-semibold text-white hover:bg-main-green-hover transition-all duration-300"
          >
            Simpan
          </button>
        </div>
      </div>

      {/* Modal untuk Ubah Kata Sandi */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Ubah Kata Sandi</h2>
            <form>
              {/* Input Sandi Baru */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Kata Sandi Baru
                </label>
                <div className="relative">
                  <input
                    type={`${Password ? "password" : "text"}`}
                    name="newPassword"
                    value={user.newPassword}
                    onChange={handleInputChange}
                    className={`w-full h-10 px-4 rounded-lg border focus:outline-none focus:ring-2 ${
                      errors.newPassword
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.newPassword ? (
                    <p className="text-red-500 text-sm mt-1">
                      Password baru tidak valid
                    </p>
                  ) : (
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
                  )}
                </div>
              </div>

              {/* Input Konfirmasi Sandi Baru */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Konfirmasi Kata Sandi
                </label>
                <div className="relative">
                  <input
                    type={`${KonfirmasiPassword ? "password" : "text"}`}
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full h-10 px-4 rounded-lg border focus:outline-none focus:ring-2 ${
                      errors.confirmPassword
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.confirmPassword ? (
                    <p className="text-red-500 text-sm mt-1">
                      Konfirmasi password tidak sama
                    </p>
                  ) : (
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
                  )}
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-800"
                  onClick={toggleModal}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white rounded-lg bg-main-green"
                  onClick={updatePassword}
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
