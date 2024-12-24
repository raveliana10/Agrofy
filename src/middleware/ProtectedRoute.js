const ProtectedRoute = ({ children, isLoggedIn }) => {
  // Jika belum login, arahkan ke halaman login
  if (!isLoggedIn) {
    return (window.location.href = "/login");
  }

  // Jika sudah login, tampilkan komponen anak
  return children;
};

export default ProtectedRoute;
