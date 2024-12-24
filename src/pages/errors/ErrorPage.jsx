import ButtonHref from "../../components/Button/ButtonHref";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex max-md:flex-col items-center justify-center  m-auto bg-bg-body w-full">
      <div className="w-full md:w-1/2 p-4 md:p-8">
        <h1 className="text-4xl md:text-6xl font-bold text-black mb-4 flex flex-col justify-center max-md:text-center py-5">
          Halaman tidak ditemukan!
        </h1>
        <p className="text-lg md:text-xl text-black mb-8 max-md:text-center">
          Ups, halaman yang anda cari tidak ditemukan. Silahkan kembali ke
          halaman Beranda
        </p>
        <div className="flex w-[30%] max-md:justify-center">
          <ButtonHref href="/" text="Kembali" variant="primary" />
        </div>
      </div>
    </div>
  );
}
