import Sidebar from "../../components/Sidebar/Sidebar";
import Indikatordash from "../../components/inidkatordash/Indikatordash";
import { Outlet } from "react-router-dom";
import React, { useState } from "react";

export default function Dashboard() {
  // menu bar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-60 flex-shrink-0 h-full hidden lg:block">
        <Sidebar />
      </div>

      {/* Sidebar for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        ></div>
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform bg-gray-800 w-60 h-full transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <Sidebar />
      </div>

      <div className="flex-1 p-5 overflow-y-auto h-full pt-24">
        {/* Menu Bar */}
        <div className="flex justify-between items-center mb-5">
          <div className="w-full">
            <button
              className="lg:hidden text-gray-800 bg-gray-200 p-2 rounded-md"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12h18M3 6h18M3 18h18"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Indikator */}
        <div className="mb-9">
          <Indikatordash />
        </div>

        {/* Menu Utama */}
        <Outlet />
      </div>
    </div>
  );
}
