import ButtonHref from "../../components/Button/ButtonHref";
import ImageImport from "../../data/ImageImport";

export default function PemberdayaanPage() {
  return (
    <section className="bg-white pt-20 max-w-screen-lg mx-auto">
      <div className="w-konten mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold py-5 text-center">
          Pemberdayaan Pengolahan Limbah Organik
        </h1>
        <p className="lg:text-base text-center mb-5 w-[80%] m-auto">
          Temukan berbagai video dan artikel untuk meningkatkan keterampilan dan
          pengetahuan anda dalam mengolah limbah organik
        </p>

        <div className="w-full flex flex-col lg:flex-row justify-around items-center p-2 my-7 lg:my-10 ">
          <div className="lg:w-[45%] bg-white shadow-xl p-3 rounded-lg my-2 lg:my-0">
            <img
              src={ImageImport.video}
              className="w-full h-[200px] rounded-lg object-contain mb-10"
            ></img>

            <div className="mt-5 text-center">
              <h3 className="font-bold text-xl">Video Pemberdayaan</h3>
              <p className="my-2 text-sm">
                Beriskian video pemberdayaan dalam mengolah limbah pertanian
                organik
              </p>

              <div className="lg:w-[50%] mx-auto py-5 flex justify-center">
                <ButtonHref
                  href="/video"
                  text="Jelajah Sekarang"
                  variant="primary"
                />
              </div>
            </div>
          </div>

          <div className="lg:w-[45%] bg-white shadow-xl p-3 rounded-lg my-2 lg:my-0">
            <img
              src={ImageImport.artikel}
              className="w-full h-[200px] rounded-lg object-contain mb-10"
            ></img>

            <div className="mt-5 text-center">
              <h3 className="font-bold text-xl">Artikel Pemberdayaan</h3>
              <p className="my-2 text-sm">
                Berisikan artikel-artikel pemberdayaan dalam mengolah limbah
                pertanian organik
              </p>

              <div className="lg:w-[50%] mx-auto py-5 flex justify-center">
                <ButtonHref
                  href="/artikel"
                  text="Jelajah Sekarang"
                  variant="primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
