import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import ErrorPage from "./pages/errors/ErrorPage";
import AppShell from "./AppShell";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import TentangKamiPage from "./pages/TentangKamiPage";
import ArtikelList from "./pages/Artikel/ArtikelList";
import ArtikelDetail from "./pages/Artikel/ArtikelDetail";
import Dashboard from "./pages/menejemen/Dashboard";
import VideoDetail from "./pages/Video/VideoDetail";
import VideoList from "./pages/Video/VideoList";
import DataLimbah from "./pages/menejemen/DataLimbah";
import MainDashboard from "./pages/menejemen/MainDashboard";
import OlahLimbah from "./pages/menejemen/OlahLimbah";
import RiwayatLimbah from "./pages/menejemen/RiwayatLimbah";
import HasilOlahan from "./pages/menejemen/HasilOlahan";
import Laporan from "./pages/menejemen/Laporan";
import Komunitas from "./pages/Komunitas/Komunitas";
import PemberdayaanPage from "./pages/Pemberdayaan/PemberdayaanPage";
import DashboardAdmin from "./pages/dashboardAdmin/DashboardAdmin";
import DashboardArtikel from "./pages/dashboardAdmin/DashboardArtikel";
import DashboardVideo from "./pages/dashboardAdmin/DashboardVideo";
import MainDashboardAdmin from "./pages/dashboardAdmin/MainDashboardAdmin";
import DashboardKategori from "./pages/dashboardAdmin/DashboardKategori";
import RoleBasedRoute from "./middleware/RoleBasedRoute";
import ProtectedRoute from "./middleware/ProtectedRoute";
import ProfilePage from "./pages/Profile/ProfilePage";

function App() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const userRole = sessionStorage.getItem("Role");

  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<IndexPage />} />
        <Route path="/tentang_kami" element={<TentangKamiPage />} />
        <Route path="/pemberdayaan" element={<PemberdayaanPage />} />
        <Route
          path="/artikel"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ArtikelList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/artikel_detail/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ArtikelDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/video"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <VideoList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/video_detail/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <VideoDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/komunitas"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Komunitas />
            </ProtectedRoute>
          }
        />

        {/* route for dashboard management */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<MainDashboard />} />
          <Route path="data_limbah" element={<DataLimbah />} />
          <Route path="olah_limbah" element={<OlahLimbah />} />
          <Route path="riwayat" element={<RiwayatLimbah />} />
          <Route path="hasil_olahan" element={<HasilOlahan />} />
          <Route path="laporan" element={<Laporan />} />
        </Route>

        <Route
          path="/dashboard-admin"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <RoleBasedRoute role={userRole} allowedRoles={["admin"]}>
                <MainDashboardAdmin />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        >
          <Route path="" element={<DashboardAdmin />} />
          <Route path="artikel-admin" element={<DashboardArtikel />} />
          <Route path="video-admin" element={<DashboardVideo />} />
          <Route path="kategori-admin" element={<DashboardKategori />} />
        </Route>
      </Route>

      {/* auth */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* error page */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
