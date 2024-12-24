import ImageImport from "../../data/ImageImport";

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="mx-auto w-[90%] py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <img
                src={ImageImport.logo}
                className="h-6 md:h-8 me-3"
                alt="FlowBite Logo"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between w-[26rem]">
            <div className="my-3 md:my-0">
              <h2 className="mb-4 md:mb-6 text-lg font-semibold text-white uppercase underline md:no-underline">
                Navigasi
              </h2>
              <ul className="text-white font-light md:font-medium">
                <li className="mb-2">
                  <a href="/#hero" className="hover:underline">
                    Home
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/#tentang_kami" className="hover:underline">
                    Tentang Kami
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/#pemberdayaan" className="hover:underline">
                    Pemberdayaan
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/#komunitas" className="hover:underline">
                    Komunitas
                  </a>
                </li>
              </ul>
            </div>

            <div className="">
              <h2 className="mb-4 md:mb-6 text-lg font-semibold text-white uppercase underline md:no-underline">
                Kontak
              </h2>
              <ul className="text-white font-light md:font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline ">
                    Agrofyteam@gmail.com
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    +6285739076216
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-white sm:text-center">
            &copy; {new Date().getFullYear()} Agrofy. All rights reserved.
          </span>

          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a href="#" className="text-white">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#" className="text-white ms-5">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="text-white ms-5">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a href="#" className="text-white ms-5">
              <i className="fa-brands fa-discord"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
