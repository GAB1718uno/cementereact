"use client";
import { IoMenu } from "react-icons/io5";
import { useSidebar } from "./SidebarContext";

export const SidebarToggle: React.FC = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="fixed top-4 left-4 z-20 p-2 bg-blue-500 rounded-md text-white"
    >
      <IoMenu size={24} />
    </button>
  );
};

export default SidebarToggle;