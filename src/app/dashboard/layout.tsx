"use client"; // Necesario para usar el contexto

import { useSidebar } from "@/components/nivelApp/SidebarContext";
import { Sidebar } from "../../components";
import { useEffect } from "react";
import AuthService from "../services/authService";
import SidebarToggle from "@/components/nivelApp/SidebarToogle";




export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

 



  const { isOpen } = useSidebar(); // Usa el estado del sidebar

  

  return (
    <div className="overflow-y-scroll w-screen h-screen antialiased text-slate-700 selection:bg-blue-600 selection:text-white">
      <div className="flex">
        {/* Botón de Toggle y Sidebar */}
        <SidebarToggle />
        <Sidebar />

        {/* Contenedor principal que se desplaza cuando el sidebar está abierto */}
        <div
          className={`w-full bg-slate-100 mt-16 text-slate-700 transition-all duration-300 ease-in-out ${
            isOpen ? "ml-[300px]" : "ml-0"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
