import { useLocation } from "react-router-dom";

export default function SidebarAdmin() {
  const location = useLocation();

  // Fungsi untuk mengecek apakah halaman aktif
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-full bg-dashboard text-white p-5 lg:pt-28">
        <h2 className="text-base font-bold mb-6 text-black">Dashboard Admin</h2>
        <ul className="space-y-4">
          <li>
            <a
              href="/dashboard-admin"
              className={`flex items-center p-2 rounded-md text-black ${
                isActive("/dashboard-admin")
                  ? "bg-main-green text-white"
                  : "hover:bg-main-green-hover hover:text-white"
              }`}
            >
              <i className="fa-solid fa-user-tie text-lg"></i>
              <span className="ml-4">Data Admin</span>
            </a>
          </li>
          <li>
            <a
              href="/dashboard-admin/kategori-admin"
              className={`flex items-center p-2 rounded-md text-black ${
                isActive("/dashboard-admin/kategori-admin")
                  ? "bg-main-green text-white"
                  : "hover:bg-main-green-hover hover:text-white"
              }`}
            >
              <i className="fa-solid fa-bookmark text-lg"></i>
              <span className="ml-4">Data Kategori</span>
            </a>
          </li>
          <li>
            <a
              href="/dashboard-admin/artikel-admin"
              className={`flex items-center p-2 rounded-md text-black ${
                isActive("/dashboard-admin/artikel-admin")
                  ? "bg-main-green text-white"
                  : "hover:bg-main-green-hover hover:text-white"
              }`}
            >
              <i className="fa-solid fa-newspaper text-lg"></i>
              <span className="ml-4">Data Artikel</span>
            </a>
          </li>
          <li>
            <a
              href="/dashboard-admin/video-admin"
              className={`flex items-center p-2 rounded-md text-black ${
                isActive("/dashboard-admin/video-admin")
                  ? "bg-main-green text-white"
                  : "hover:bg-main-green-hover hover:text-white"
              }`}
            >
              <i className="fa-solid fa-video text-lg"></i>
              <span className="ml-4">Data Video</span>
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
}
