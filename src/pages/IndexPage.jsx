import ImageImport from "../data/ImageImport";
import ButtonHref from "../components/Button/ButtonHref";
import CardAlasan from "../components/Card/CardAlasan";
import Loading from "../components/Loading/Loading";

export default function IndexPage() {
  return (
    <div className="bg-bg-body ">
      {/* Hero Section */}
      <section
        className="bg-brown-light pt-32 lg:pt-32 pb-14 lg:pb-26 flex items-center"
        id="hero"
      >
        <div className=" mx-auto flex flex-col lg:flex-row justify-between items-center lg:h-[35rem] max-w-screen-xl">
          <div className="w-[55%] md:w-[40%] lg:w-[60%] flex justify-center lg:hidden">
            <img src={ImageImport.hero} className="w-full"></img>
          </div>

          {/* Kiri */}
          <div className="p-2 lg:pt-0 w-[80%] lg:w-[60%] overflow-hidden pr-10">
            <h1 className="text-3xl lg:text-6xl text-center lg:text-start font-extrabold text-black overflow-hidden">
              Ayo cari tau manfaat limbah pertanian.{" "}
            </h1>
            <h4 className="font-medium text-sm lg:text-xl text-center lg:text-justify text-black mb-6 mt-3">
              Temukan cara-cara praktis mengubah limbah pertanian menjadi produk
              bermanfaat. Dapatkan informasi dan tips untuk menjaga lingkungan
              sekaligus meningkatkan kesejahteraan. Mulai sekarang, kelola
              limbah dengan lebih bijak!"
            </h4>
            <div className="flex justify-center mx-auto w-[80%] md:w-[50%] lg:block lg:mx-0 lg:w-[35%] py-3">
              <ButtonHref
                href="/#pemberdayaan"
                text="Mulai Belajar Sekarang"
                variant="primary"
              />
            </div>
          </div>
          {/* Kanan */}
          <div className="lg:w-[38%] hidden lg:block overflow-hidden">
            <img src={ImageImport.hero} className="w-full"></img>
          </div>
        </div>
      </section>

      {/* Tentang Kami Section */}
      <section className="bg-white pt-20" id="tentang_kami">
        <div className="w-konten mx-auto flex flex-col justify-center items-center">
          <img
            src={ImageImport.tentang_kami}
            className="w-[55%] lg:w-[40%]"
          ></img>

          <h3 className="text-center font-medium text-sm pt-2 lg:text-xl text-black w-full lg:w-[80%] mx-auto">
            Selamat Datang di AGROFY, platform digital untuk pemberdayaan dalam
            mengelola limbah pertanian. Mari bersama-sama belajar mengolah
            limbah dan mengubahnya menjadi sumber daya berharga. Limbah yang
            sering kita anggap tidak berguna sebenarnya memiliki potensi besar
            untuk menciptakan lingkungan yang lebih bersih dan berkelanjutan.
            Dengan pengetahuan yang tepat, kita bisa mengolah limbah pertanian
            dan industri menjadi energi, pupuk, atau produk bermanfaat lainnya.
          </h3>

          <div className="p-5 my-3">
            <ButtonHref
              href="/tentang_kami"
              text="Kenalan Yuk"
              variant="primary"
            />
          </div>
        </div>
      </section>

      {/* Alasan Section */}
      <section className="bg-brown-light pt-30 p-2">
        <div className="w-konten mx-auto p-2 mt-20">
          <h1 className="text-center text-2xl lg:text-3xl font-extrabold p-2 mb-5">
            Mengapa Mengelola Limbah itu penting?
          </h1>

          {/* Card */}
          <div className="flex flex-col lg:flex-row lg:justify-evenly p-2">
            <CardAlasan
              icon="fa-solid fa-earth-europe"
              judul="Mengurangi Polusi Lingkungan"
              text="Pengelolaan limbah organik membantu mengurangi pencemaran tanah,
                air, dan udara akibat pembusukan limbah yang tidak dikelola
                dengan baik."
            />
            <CardAlasan
              icon="fa-solid fa-seedling"
              judul="Menghasilkan Pupuk Alami"
              text="Limbah organik dapat diolah menjadi kompos yang bermanfaat untuk
                meningkatkan kesuburan tanah, sehingga mengurangi pupuk kimia."
            />
            <CardAlasan
              icon="fa-solid fa-recycle"
              judul="Menghemat Sumber Daya"
              text="Dengan mendaur ulang limbah, kita bisa mengurangi kebutuhan akan
                bahan baku baru dan mendukung penggunaan sumber daya secara
                berkelanjutan."
            />
          </div>
        </div>
      </section>

      {/* Pemberdayaan Section */}
      <section className="bg-white pt-24" id="pemberdayaan">
        <div className="w-konten p-2 m-auto flex lg:flex-row flex-col lg:justify-evenly justify-center items-center">
          {/* Kanan */}
          <div className="lg:w-[38%] w-full md:w-[65%] mb-2 lg:mb-0">
            <img
              src={ImageImport.pemberdayaan}
              className="w-full"
              alt="Pemberdayaan Image"
            />
          </div>
          {/* Kiri */}
          <div className="lg:w-1/2 w-full">
            <h1 className="text-xl lg:text-3xl text-center lg:text-left font-extrabold text-black p-2 lg:w-[80%]">
              Manfaatkan Fitur Pemberdayaan untuk Pengelolaan Limbah Pertanian
              Organik
            </h1>
            <p className="p-2 font-medium lg:text-lg text-sm text-center lg:text-justify">
              Fitur pemberdayaan ini membantu kamu belajar dalam mengelola
              limbah pertanian organik secara efektif. Dengan panduan dan
              pelatihan yang tersedia, Kamu dapat belajar cara mengolah limbah
              menjadi produk yang bernilai, sekaligus mendukung keberlanjutan
              lingkungan dan meningkatkan kesejahteraan ekonomi. Dapatkan tips
              dan panduan praktis untuk mengolah limbah, sambil ikut menjaga
              lingkungan dan meningkatkan penghasilan.
            </p>
            <div className="py-1 w-[70%] md:w-[50%] mx-auto flex justify-center lg:m-0 lg:w-[35%]">
              <ButtonHref
                href="/pemberdayaan"
                text="Lihat Selengkapnya"
                variant="primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Komunitas Section */}
      <section className="bg-white pt-24" id="komunitas">
        <div className="w-konten p-2 m-auto flex lg:flex-row flex-col lg:justify-evenly justify-center items-center">
          {/* Kanan */}
          <div className="lg:hidden w-full md:w-[65%] mb-2 lg:mb-0">
            <img
              src={ImageImport.komunitas}
              className="w-full"
              alt="Komunitas Image"
            />
          </div>

          <div className="lg:w-1/2 w-full">
            <h1 className="text-xl lg:text-3xl text-center lg:text-left font-extrabold text-black p-2 lg:w-[80%]">
              Bergabung dengan Komunitas untuk Kolaborasi Pengelolaan Limbah
              Pertanian Organik
            </h1>
            <p className="p-2 font-medium lg:text-lg text-sm text-center lg:text-justify">
              Di sini, kamu bisa berbagi cerita, tips, dan pengalaman dengan
              banyak orang tentang cara sederhana mengelola limbah organik.
              Lewat komunitas ini, kita bisa saling mendukung, bertanya, dan
              belajar dari satu sama lain agar pengelolaan limbah jadi lebih
              mudah dan menyenangkan. Yuk, sama-sama jaga lingkungan kita!
            </p>
            <div className="py-1 w-[70%] mx-auto flex justify-center lg:m-0 lg:w-[35%]">
              <ButtonHref
                href="/komunitas"
                text="Gabung Sekarang"
                variant="primary"
              />
            </div>
          </div>

          {/* Kiri */}
          <div className="lg:w-[35%] lg:block hidden w-full mb-2 lg:mb-0">
            <img
              src={ImageImport.komunitas}
              className="w-full"
              alt="Komunitas Image"
            />
          </div>
        </div>
      </section>

      {/* Manajemen Section */}
      <section className="bg-white pt-32 pb-24" id="manajemen">
        <div className="w-konten p-2 m-auto flex lg:flex-row flex-col lg:justify-evenly justify-center items-center">
          {/* Kanan */}
          <div className="lg:w-[35%] md:w-[65%] w-full mb-2 lg:mb-0">
            <img
              src={ImageImport.manajemen}
              className="w-full"
              alt="Manajemen Image"
            />
          </div>
          {/* Kiri */}
          <div className="lg:w-1/2 w-full">
            <h1 className="text-xl lg:text-3xl text-center lg:text-left font-extrabold text-black p-2 lg:w-[80%]">
              Kelola Limbah dengan Mudah Lewat Fitur Manajemen Pengelolaan
            </h1>
            <p className="p-2 font-medium lg:text-lg text-sm text-center lg:text-justify">
              Fitur ini memudahkan kamu dalam mengelola limbah secara teratur
              dan efisien. Kamu bisa memantau, mencatat, dan mengatur seluruh
              proses pengolahan limbah, mulai dari pengumpulan hingga pengubahan
              menjadi produk yang bermanfaat. Dengan manajemen yang tepat,
              pengelolaan limbah menjadi lebih sederhana, terstruktur, dan
              hasilnya pun lebih maksimal, baik untuk lingkungan maupun
              kesejahteraan!
            </p>
            <div className="py-1 w-[70%] mx-auto flex justify-center lg:m-0 lg:w-[35%]">
              <ButtonHref
                href={
                  sessionStorage.getItem("Role") === "admin"
                    ? "/dashboard-admin"
                    : "/dashboard"
                }
                text="Lihat Selengkapnya"
                variant="primary"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
