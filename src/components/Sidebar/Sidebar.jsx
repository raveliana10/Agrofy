import React, { useState } from "react";
import ImageImport from "../../data/ImageImport";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  // Function untuk menentukan apakah item aktif
  const isActive = (path) => location.pathname === path;

  // Function untuk mendapatkan ikon berdasarkan kondisi
  const getIconSrc = (isHovered, path, defaultIcon, hoverIcon, activeIcon) => {
    if (isActive(path)) return activeIcon; // Ikon aktif
    if (isHovered) return hoverIcon; // Ikon hover
    return defaultIcon; // Ikon default
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-full bg-dashboard text-white p-5 lg:pt-28">
        <h2 className="text-base font-bold mb-6 text-black">
          Dashboard Management
        </h2>
        <ul className="space-y-4">
          {[
            {
              path: "/dashboard",
              label: "Dashboard",
              defaultIcon: ImageImport.dashboard,
              hoverIcon: ImageImport.dashboard_active,
              activeIcon: ImageImport.dashboard_active,
            },
            {
              path: "/dashboard/data_limbah",
              label: "Data Limbah",
              defaultIcon: ImageImport.limbah,
              hoverIcon: ImageImport.limbah_active,
              activeIcon: ImageImport.limbah_active,
            },
            {
              path: "/dashboard/olah_limbah",
              label: "Olah Limbah",
              defaultIcon: ImageImport.proses,
              hoverIcon: ImageImport.proses_active,
              activeIcon: ImageImport.proses_active,
            },
            {
              path: "/dashboard/riwayat",
              label: "Riwayat",
              defaultIcon: ImageImport.riwayat,
              hoverIcon: ImageImport.riwayat_active,
              activeIcon: ImageImport.riwayat_active,
            },
            {
              path: "/dashboard/hasil_olahan",
              label: "Hasil Olahan",
              defaultIcon: ImageImport.olahan,
              hoverIcon: ImageImport.olahan_active,
              activeIcon: ImageImport.olahan_active,
            },
          ].map(({ path, label, defaultIcon, hoverIcon, activeIcon }) => {
            const [isHovered, setHovered] = useState(false);

            return (
              <li key={path}>
                <a
                  href={path}
                  className={`flex items-center p-2 rounded-md text-black ${
                    isActive(path)
                      ? "bg-main-green text-white"
                      : "hover:bg-main-green-hover hover:text-white"
                  }`}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <span>
                    <img
                      src={getIconSrc(
                        isHovered,
                        path,
                        defaultIcon,
                        hoverIcon,
                        activeIcon
                      )}
                      alt={label}
                    />
                  </span>
                  <span className="ml-4">{label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
