import { useState, useEffect } from "react";
import ImageImport from "../../data/ImageImport";
import ButtonSubmit from "../../components/Button/ButtonSubmit";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { showAlert } from "../../components/SweetAlert/SweetAlert";
import Loading from "../../components/Loading/Loading.jsx";
import axios from "axios";
import config from "../../config/config";
import { useNavigate } from "react-router-dom";

export default function Komunitas() {
  // modal
  const [showModalKomen, setShowModalKomen] = useState(false);
  const [showModalPost, setShowModalPost] = useState(false);

  // State untuk loading
  const [loading, setLoading] = useState(false);
  //  navigation
  const navigate = useNavigate();
  const [selectedCommentId, setSelectedCommentId] = useState(null); // State untuk menyimpan ID

  // set state
  const [selectKomunitas, setSelectKomunitas] = useState([]);
  const [selectBalasan, setSelectBalasan] = useState([]);

  // set state inputan
  const [gambar, setGambar] = useState("");
  const [deskirpsi, setEditorData] = useState("");
  const [balasan, setBalasan] = useState("");

  // get token
  const token = sessionStorage.getItem("Token");

  // =============================================================================================== get Postingan Komunitas
  const getKomunitas = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${config.apiUrl}/getkomunitas`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const data = response.data;
      setSelectKomunitas(data.data); // Set data dari api untuk tabel
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getKomunitas();
  }, []);

  // =============================================================================================== get Balasan Komunitas
  useEffect(() => {
    const getBalasan = async () => {
      if (selectedCommentId) {
        setLoading(true);

        try {
          const response = await axios.get(
            `${config.apiUrl}/getkomunitasbalasan/${selectedCommentId}`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          const data = response.data;
          setSelectBalasan(data.data); // Set data dari api untuk tabel
          console.log(selectBalasan);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    getBalasan();
  }, [selectedCommentId]);

  // =============================================================================================== Tambah Komunitas
  const handelTambahPost = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Menggunakan FormData untuk mengirim data multipart/form-data
    try {
      const formData = new FormData();
      formData.append("caption", deskirpsi);
      formData.append("gambar", gambar);

      await axios.post(`${config.apiUrl}/tambahkomunitas`, formData, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      showAlert({
        title: "Hore",
        text: "Postingan Berhasil Ditambah",
        iconType: "success",
        didClose: () => {
          navigate("/komunitas");
          window.location.reload();
        },
      });
      setShowModalPost(false);
      getKomunitas(); // Refresh data tabel
    } catch (error) {
      // Menangani error yang dikirimkan oleh server
      let errorMessage = "Postingan Gagal Diupload";

      if (error.response && error.response.data) {
        // Jika error dari server ada di response.data
        if (error.response.data.msg) {
          errorMessage = error.response.data.msg; // Tampilkan pesan dari server jika ada
        } else {
          errorMessage = "Terjadi kesalahan, coba lagi.";
        }
      } else if (error.message) {
        // Jika error tidak ada response dari server
        errorMessage = error.message;
      }

      // Menampilkan alert dengan pesan error spesifik
      showAlert({
        title: "Oppss",
        text: `${errorMessage}`,
        iconType: "error",
        didClose: () => {
          navigate("/komunitas");
          window.location.reload();
        },
      });

      getKomunitas(); // Refresh data tabel
    } finally {
      setLoading(false);
    }
  };

  // =============================================================================================== Tambah Balasan Komunitas
  const handelTambahKomen = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `${config.apiUrl}/tambahbalasan/${selectedCommentId}`,
        {
          balasan,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      showAlert({
        title: "Hore",
        text: "Komentar Berhasil Ditambah",
        iconType: "success",
        didClose: () => {
          navigate("/komunitas");
          window.location.reload();
        },
      });
      setShowModalKomen(false);
    } catch (error) {
      // Menangani error yang dikirimkan oleh server
      let errorMessage = "Postingan Gagal Diupload";

      if (error.response && error.response.data) {
        // Jika error dari server ada di response.data
        if (error.response.data.msg) {
          errorMessage = error.response.data.msg; // Tampilkan pesan dari server jika ada
        } else {
          errorMessage = "Terjadi kesalahan, coba lagi.";
        }
      } else if (error.message) {
        // Jika error tidak ada response dari server
        errorMessage = error.message;
      }

      // Menampilkan alert dengan pesan error spesifik
      showAlert({
        title: "Oppss",
        text: `${errorMessage}`,
        iconType: "error",
        didClose: () => {
          navigate("/komunitas");
          window.location.reload();
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // =============================================================================================== Button Add Scroll
  const [position, setPosition] = useState({ bottom: 0 });

  useEffect(() => {
    const updateButtonPosition = () => {
      const section = document.querySelector(".section-komunitas");
      if (section) {
        const sectionRect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Jika bagian bawah `section` lebih tinggi dari viewport
        if (sectionRect.bottom > viewportHeight) {
          setPosition({ bottom: 10 }); // Tetap di pojok bawah viewport
        } else {
          // Jika `section` hampir selesai digulir
          setPosition({ bottom: viewportHeight - sectionRect.bottom + 10 });
        }
      }
    };

    // Jalankan saat komponen pertama kali dirender
    updateButtonPosition();

    // Jalankan saat scroll
    window.addEventListener("scroll", updateButtonPosition);

    // Bersihkan listener saat komponen di-unmount
    return () => window.removeEventListener("scroll", updateButtonPosition);
  }, []);

  return (
    <section className="bg-brown-light lg:pt-20 pt-10 relative section-komunitas">
      <div className="w-konten max-w-screen-md mx-auto p-2">
        <h1 className="text-3xl lg:text-4xl font-bold py-5 text-center my-10">
          Komunitas Agrofy
        </h1>

        {/* Kolom Input */}
        <button
          className="h-20 w-20 bg-main-green rounded-full fixed right-2 lg:right-60 flex justify-center items-center z-50 shadow-xl"
          style={{ bottom: `${position.bottom}px` }}
          onClick={() => setShowModalPost(true)}
        >
          <i className="fa-solid fa-plus text-xl text-white"></i>
        </button>

        {/* Card */}
        <div className="flex flex-col justify-center items-center w-full">
          {/* Perulangan */}
          {selectKomunitas && selectKomunitas.length > 0 ? (
            selectKomunitas.map((data) => {
              return (
                console.log("Data foto:", data.foto),
                (
                  <div
                    key={data.id}
                    className="w-full bg-white p-7 rounded-lg shadow-lg mb-10"
                  >
                    {/* Bagian atas */}
                    <div className="flex items-center justify-between">
                      <div className="">
                        <div className="flex justify-between items-center">
                          {data.foto ? (
                            <div className="h-10 w-10 bg-black rounded-full overflow-hidden flex-shrink-0">
                              <img
                                src={`${config.apiUrlImage}/profile/${data.foto}`}
                                alt="User profile"
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-10 w-10 bg-black rounded-full overflow-hidden flex-shrink-0">
                              <img
                                src={ImageImport.default}
                                alt="User profile"
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <div className="ml-4">
                            <h5 className="lg:text-lg">{data.nama_lengkap}</h5>
                            <h5 className="text-xs">
                              {new Date(data.updated_at).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bagian tengah */}
                    <div className="w-full lg:text-justify mt-5 border-b-2 border-gray-400 pb-3">
                      {data.gambar ? (
                        <div className="w-full flex flex-col lg:flex-row flex-wrap justify-between items-center my-5">
                          <img
                            src={`${config.apiUrlImage}/komunitas/${data.gambar}`}
                            className="lg:w-full py-2 lg:py-0"
                            alt="Gambar Komunitas"
                          />
                        </div>
                      ) : (
                        <div></div>
                      )}
                      <p dangerouslySetInnerHTML={{ __html: data.caption }} />
                    </div>

                    {/* Bagian bawah */}
                    <div className="mt-3 ml-1 flex items-center w-full lg:w-[25%]">
                      {/* Icon Comment */}
                      <div className="flex items-center w-full">
                        <i
                          className="fa-regular fa-comment-dots text-xl lg:text-2xl cursor-pointer w-[15%]"
                          onClick={() => {
                            setSelectedCommentId(data.id);
                            setShowModalKomen(true);
                          }}
                        ></i>
                        <p className="text-sm mx-2">Lihat Balasan</p>
                      </div>
                    </div>
                  </div>
                )
              );
            })
          ) : (
            <p className="text-center italic text-gray-400 my-10">
              Belum Ada Postingan
            </p>
          )}
        </div>

        {/* Modal Post */}
        {showModalPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-lg w-full max-w-lg mx-4 lg:mx-0 lg:max-w-2xl overflow-y-auto max-h-[80vh]">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Buat Postingan</h3>

                <button onClick={() => setShowModalPost(false)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              {/* Form untuk Komentar Baru */}
              <div className="mt-4">
                <form onSubmit={handelTambahPost} encType="multipart/form-data">
                  <div className="mt-4 mb-4 max-h-[600px] overflow-y-auto">
                    <label className="block mb-2 text-sm font-medium text-black">
                      Tuliskan apa yang ingin diposting
                    </label>
                    <CKEditor
                      editor={ClassicEditor}
                      config={{
                        toolbar: ["bold", "italic", "undo", "redo"],
                      }}
                      data={deskirpsi}
                      onChange={(event, editor) =>
                        setEditorData(editor.getData())
                      }
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block mb-2 text-sm font-medium text-black">
                      Gambar (Opsional)
                    </label>
                    <input
                      type="file"
                      name="gambar"
                      onChange={(e) => setGambar(e.target.files[0])}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer"
                      accept="image/png, image/jpeg, image/jpg"
                    />
                  </div>

                  <div className="mt-6 w-40 m-auto">
                    <ButtonSubmit text="Posting" variant="primary" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Modal Komen */}
        {showModalKomen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-lg w-full max-w-lg mx-4 lg:mx-0 lg:max-w-2xl overflow-y-auto max-h-[80vh]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Balasan</h3>

                <button onClick={() => setShowModalKomen(false)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              {/* Daftar Balasan */}
              <div className="space-y-4">
                <div className="max-h-[500px] overflow-y-auto">
                  {selectBalasan && selectBalasan.length > 0 ? (
                    selectBalasan.map((data, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-start space-x-6 mb-6"
                        >
                          <div className="h-10 w-10 bg-black rounded-full overflow-hidden flex-shrink-0">
                            {data.foto ? (
                              <img
                                src={`${config.apiUrlImage}/profile/${data.foto}`}
                                alt="User profile"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 bg-black rounded-full overflow-hidden flex-shrink-0">
                                <img
                                  src={ImageImport.default}
                                  alt="User profile"
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )}
                          </div>
                          <div>
                            <h5 className="font-semibold">
                              {data.nama_lengkap}
                            </h5>
                            <p className="text-sm text-gray-600">
                              {data.balasan}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center italic text-gray-400 my-10">
                      Belum Ada Balasan
                    </p>
                  )}
                </div>
              </div>

              {/* Form untuk Komentar Baru */}
              <div className="mt-6">
                <form onSubmit={handelTambahKomen}>
                  <textarea
                    className="w-full p-2 border rounded-lg"
                    placeholder="Tulis komentar Anda..."
                    name="balasan"
                    value={balasan} // Bind nilai state ke textarea
                    onChange={(e) => setBalasan(e.target.value)} // Perbarui state saat ada perubahan
                    required
                  ></textarea>

                  <div className="mt-6 w-40 m-auto">
                    <ButtonSubmit text="Kirim" variant="primary" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay Loading */}
      {loading && <Loading />}
    </section>
  );
}
