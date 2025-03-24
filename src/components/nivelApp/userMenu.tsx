"use client";
import { useRouter } from 'next/navigation';

interface UserMenuProps {
  onClose: () => void; // Función para cerrar el menú
}

const UserMenu = ({ onClose }: UserMenuProps) => {
  const router = useRouter();

  // Maneja el clic en "Editar perfil"
  const handleEditProfile = () => {
    router.push('/perfil'); // Redirige a la página de edición de perfil
    onClose(); // Cierra el menú
  };

  // Maneja el clic en "Cerrar sesión"
  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token del localStorage
    localStorage.removeItem("user"); // Elimina los datos del usuario
    router.push('../auth/login'); // Redirige a la página de inicio de sesión
    onClose(); // Cierra el menú
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
      <button
        onClick={handleEditProfile}
        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Editar perfil
      </button>
      <button
        onClick={handleLogout}
        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default UserMenu;