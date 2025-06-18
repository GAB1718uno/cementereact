"use client"
import Image from "next/image";
import { IoAddCircle, IoAppsSharp, IoAt, IoFootball } from "react-icons/io5";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { useSidebar } from "./SidebarContext";
import UserHeader from "./userHeader";

const menuItems = [
  {
    path: "/dashboard/navegar",
    icon: <IoAppsSharp size={50} />,
    title: "Mapa de Sepulturas",
    subTitle: "Visión Global del cementerio",
  },
  {
    path: "/dashboard/favoritos",
    icon: <IoAddCircle size={50} />,
    title: "Favoritos",
    subTitle: "Selección personal",
  },
  {
    path: "/dashboard/sepulturas",
    icon: <IoAt size={50} />,
    title: "Sepulturas",
    subTitle: "Ubicación, fallecidos en la misma",
  },
  {
    path: "/dashboard/fallecidos",
    icon: <IoFootball size={50} />,
    title: "Fallecidos",
    subTitle: "Relación de fallecidos",
  },
  {
    path: "/dashboard/muerto/",
    icon: <IoFootball size={50} />,
    title: "Busqueda",
    subTitle: "Relación de fallecidos por apellido",
  },
];

export const Sidebar: React.FC = () => {

  const {isOpen, toggleSidebar} = useSidebar();

  const HandleMenuClick = ()=> {
    toggleSidebar();
  }

  return (
    <div
      id="menu"
      className={`fixed mt-16 left-0 w-64 p-2 pr-2 bg-gray-900 min-h-screen z-10 text-slate-300 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div id="logo" className="my-4 px-6">
        <h1 className="text-lg md:text-2xl font-bold text-white">
          Cementerio<span className="text-blue-500"><br />.com.es</span>
        </h1>
        <p className="text-slate-500 text-sm">
          Administra tus acciones y actividades
        </p>
      </div>

      {/* Aqui los datos del usuario logueado */}
      <UserHeader />
  
      {/* <div id="profile" className="px-6 py-5">
        <p className="text-slate-500 pb-2">Bienvenido de vuelta,</p>
        <a href="#" className="inline-flex space-x-2 items-center" onClick={HandleMenuClick}>
          <Image
            className="rounded-full"
            src="/gilson_dni0002_2.jpg"
            loading="lazy"
            alt="Avatar del Usuario"
            width={40}
            height={55}
          />
          <span className="text-sm md:text-base font-bold">
            Gilson Albino Barbosa
          </span>
        </a>
      </div> */}
  
      <div id="nav" className="w-full px-3">
        {menuItems.map((menuItemsMapeado) => (
          <SidebarMenuItem
            key={menuItemsMapeado.path}
            {...menuItemsMapeado}
            onClick={HandleMenuClick} // ✅ Asegúrate de que la función está definida
          />
        ))}
      </div>
    </div>
  );
  };
