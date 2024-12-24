import ButtonHref from "../../components/Button/ButtonHref";

export default function CardVideo(props) {
  const { img, judul, deskripsi, href, kategori } = props;
  return (
    <div className="shadow-md shadow-gray-300 rounded-lg overflow-hidden w-full lg:w-[30%] my-4 flex flex-col justify-between bg-white">
      {/* Gambar */}
      <div
        className="relative w-full overflow-hidden"
        style={{ paddingBottom: "56.25%" }}
      >
        <img
          src={img}
          alt="Thumbnail"
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300"
        />
      </div>

      {/* Konten */}
      <div className="px-4 pt-4 flex flex-col gap-3">
        {/* Judul */}
        <p className="text-black font-bold text-sm lg:text-base line-clamp-2 text-center lg:text-left">
          {judul}
        </p>

        {/* Deskripsi */}
        <p className="text-gray-600 font-normal text-xs lg:text-sm line-clamp-3 text-center lg:text-justify">
          {deskripsi.replace(/<\/?[^>]+(>|$)/g, "")}
        </p>

        {/* Kategori */}
        <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-main-green font-medium mt-2">
          <i className="fa-regular fa-bookmark"></i>
          <span>{kategori}</span>
        </div>
      </div>

      {/* Tombol */}
      <div className="p-4 -ml-1 mb-4 flex lg:justify-start justify-center">
        <ButtonHref
          href={href}
          text="Tonton Sekarang"
          variant="primary"
          className="w-full lg:w-[80%] mx-auto"
        />
      </div>
    </div>
  );
}
