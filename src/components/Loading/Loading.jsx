export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-50 z-50 flex items-center justify-center">
      <div
        className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-main-green"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
