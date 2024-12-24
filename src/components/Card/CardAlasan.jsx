export default function CardAlasan(props) {
  const { icon, judul, text } = props;
  return (
    <div className="bg-[#743A13] p-5 flex flex-col justify-center items-center w-full lg:w-[28%] rounded-lg my-1 lg:my-0">
      <i className={`${icon} text-white text-5xl p-2`}></i>

      <h3 className="text-center font-semibold text-lg text-white my-5">
        {judul}
      </h3>

      <p className="text-center text-white">{text}</p>
    </div>
  );
}
