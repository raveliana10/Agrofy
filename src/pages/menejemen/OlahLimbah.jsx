import { useState } from "react";
import ImageImport from "../../data/ImageImport";
import ButtonHref from "../../components/Button/ButtonHref";
import TambahOlahan from "../../components/Modal/TambahOlahan";
import Tabledash from "../../components/Tabledash/Tabledash";

export default function OlahLimbah() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="w-full h-auto rounded-md py-5 px-5 space-y-5 border-2 border-black">
        <div className="bg-white  w-full h-[100%] rounded-md   ">
          <div className="">
            <div className="flex justify-between pb-10">
              <h1 className="font-bold text-3xl py-2">Olah Limbah</h1>
              <div className="py-2">
                <ButtonHref
                  href="#"
                  text="Tambah"
                  variant="primary"
                  onClick={handleOpenModal}
                />
              </div>
            </div>
            <Tabledash />
          </div>
        </div>
      </div>
      <TambahOlahan isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
