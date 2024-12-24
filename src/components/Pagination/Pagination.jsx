export default function Pagination({
  currentPage,
  totalPages,
  totalData,
  fetchData, // Fungsi fetch menjadi lebih generik
  itemsPerPage = 10, // Menentukan jumlah item per halaman secara default
}) {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchData(page); // Panggil fungsi fetchData untuk halaman yang sesuai
    }
  };

  // Menentukan data yang ditampilkan pada halaman saat ini
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalData);

  return (
    <div className="flex flex-col items-center space-y-4 my-4">
      {/* Menampilkan total data dan data yang ditampilkan */}
      <div className="text-sm text-gray-500">
        <span>
          Menampilkan {startItem} - {endItem} dari <strong>{totalData}</strong>{" "}
          data
        </span>
      </div>

      {/* Pagination Controls */}
      <nav aria-label="Pagination" className="flex items-center space-x-2">
        {/* Tombol Previous */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        {/* Menampilkan nomor halaman */}
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page + 1)}
            className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 ${
              page + 1 === currentPage
                ? "bg-main-green text-gray-700 font-bold"
                : "text-gray-700"
            }`}
          >
            {page + 1}
          </button>
        ))}

        {/* Tombol Next */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </nav>
    </div>
  );
}
