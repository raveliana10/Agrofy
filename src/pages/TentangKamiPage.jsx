import ImageImport from "../data/ImageImport";
import Team from "../data/Team/Team";
import CardTeam from "../components/Card/CardTeam";

export default function TentangKamiPage() {
  return (
    <section className="bg-white pt-20 lg:pt-28 max-w-screen-xl mx-auto">
      <div className="w-konten m-auto flex justify-center items-center flex-col">
        <img
          src={ImageImport.logo}
          className="my-3 lg:my-5 w-[80%] md:w-[50%] lg:w-[30%]"
          alt="Logo Agrofy"
        />

        <h5 className="text-justify my-10 font-normal text-sm lg:text-lg ">
          Agrofy adalah platform digital komprehensif yang dirancang untuk
          membantu petani dalam mengoptimalkan pengelolaan limbah pertanian
          melalui pemberdayaan dan kolaborasi. Dengan fokus utama pada edukasi,
          Agrofy menyediakan video tutorial interaktif yang memandu petani
          langkah demi langkah dalam mengelola limbah pertanian, mulai dari
          teknik dasar hingga strategi pengelolaan yang lebih maju. Platform ini
          juga membangun komunitas online yang memungkinkan petani untuk
          bertukar pengetahuan, pengalaman, serta solusi praktis, menciptakan
          ekosistem kolaboratif yang mendorong inovasi dan efisiensi. Selain
          itu, Agrofy dilengkapi dengan fitur manajemen limbah yang terstruktur,
          memungkinkan petani untuk memantau kinerja pengelolaan limbah mereka,
          mencatat proses dan progres melalui laporan yang didukung notifikasi
          otomatis, sehingga memastikan pengelolaan yang konsisten dan tepat
          waktu. MVP dari Agrofy adalah pemberdayaan petani melalui edukasi yang
          mendalam dan komunitas online yang aktif. Fitur komunitas ini tidak
          hanya mendukung pertukaran pengetahuan, tetapi juga memberikan ruang
          bagi petani untuk saling berkolaborasi, berbagi wawasan lokal, dan
          menemukan solusi atas tantangan yang dihadapi, sehingga mampu
          meningkatkan keberlanjutan dan produktivitas mereka secara signifikan.
        </h5>

        <div className="flex flex-col lg:flex-row justify-around items-center">
          <div className="lg:w-[35%] flex justify-center">
            <img src={ImageImport.visimisi} className="w-full" />
          </div>

          <div className="lg:w-1/2">
            <div className="my-5">
              <h1 className="font-extrabold text-2xl py-1 text-center lg:text-left">
                Visi
              </h1>
              <p className="font-normal text-sm lg:text-lg text-justify">
                Menjadi tim merge yang inovatif, kreatif, dan kolaborasi yang
                harmonis untuk menciptakan produk yang berkualitas tinggi.
              </p>
            </div>
            <div className="my-5">
              <h1 className="font-extrabold text-2xl py-1 text-center lg:text-left">
                Misi
              </h1>
              <ol className="list-decimal list-inside flex flex-col justify-center items-center lg:block text-justify lg:text-left">
                <li className="font-normal text-sm lg:text-lg my-1">
                  Mengembangkan ide-ide kreatif dan inovatif yang dapat
                  diimplementasikan dalam proyek untuk memberikan solusi nyata
                  terhadap masalah yang ada.
                </li>
                <li className="font-normal text-sm lg:text-lg my-1">
                  Mengembangkan kemampuan individu dan tim melalui kolaborasi.
                </li>
                <li className="font-normal text-sm lg:text-lg my-1">
                  Menyelesaikan setiap permasalahan dan menemukan solusi
                  bersama.
                </li>
                <li className="font-normal text-sm lg:text-lg my-1">
                  Menciptakan inovasi dan solusi permasalahan masyarakat di
                  sektor agraris.
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div className="w-full lg:my-20 my-10 ">
          <h2 className="text-center font-bold text-3xl py-1">TIM AGROFY</h2>

          {/* Card */}
          <div className="flex flex-col lg:flex-row justify-center items-center flex-wrap p-2 w-full">
            {Team.map((Data) => (
              <CardTeam
                key={Data.id}
                img={Data.img}
                jabatan={Data.jabatan}
                nama={Data.nama}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
