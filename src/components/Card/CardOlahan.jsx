import { useState } from "react";
import ButtonHref from "../../components/Button/ButtonHref";
import DetailHasilOlahan from "../../components/Modal/DetailHasilOlahan"; // Use DetailHasilOlahan
import ImageImport from "../../data/ImageImport";

export default function CardOlahan(props) {
  const { img, judul, deskripsi, id } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 px-4 py-4">
      <div className="bg-white rounded-md border-2 drop-shadow-md shadow-gray-400 overflow-hidden w-full max-w-sm flex flex-col">
        <div className="w-full">
          <img
            className="w-full h-[250px] object-cover"
            src={img}
            alt={judul}
          />
        </div>
        <div className="flex flex-col justify-between flex-grow p-4">
          <div>
            <p className="font-semibold text-lg line-clamp-1 mb-2">{judul}</p>
            <p className="text-base text-gray-600 line-clamp-2">{deskripsi}</p>
          </div>
          <div className="flex justify-center mt-4">
            <ButtonHref
              href="#"
              text="Lihat"
              variant="primary"
              onClick={handleOpenModal} // Open modal on button click
            />
          </div>
        </div>
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <DetailHasilOlahan
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          idHasil={id}
          title={judul}
          imgs={img}
          deskripsi={deskripsi}
        />
      )}
    </div>
  );
}
