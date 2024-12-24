export default function Paginationhasil({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page); // Panggil fungsi onPageChange untuk halaman yang sesuai
    }
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col items-center space-y-4 my-4">
      <div className="text-sm text-gray-500">
        <span>
          Menampilkan {startItem} - {endItem} dari <strong>{totalItems}</strong>{" "}
          data
        </span>
      </div>
      <nav aria-label="Pagination" className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
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
