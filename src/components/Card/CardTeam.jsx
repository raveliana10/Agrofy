export default function CardTeam(props) {
  const { img, jabatan, nama } = props;
  return (
    <div className="bg-white shadow-sm-light shadow-gray-500 p-2 w-[90%] lg:w-[17%] m-4">
      <img src={img} className="w-full" />

      <p className="text-[#6B7280] font-medium text-sm mt-2">{jabatan}</p>
      <p className="text-black font-normal text-xs mt-1">{nama}</p>
    </div>
  );
}
