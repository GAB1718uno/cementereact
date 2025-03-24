"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import UserMenu from './userMenu';

interface User {
  usuario: string;
  avatar: string;
}

const UserHeader = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Función para decodificar el token JWT
  const decodeJWT = (token: string) => {
    try {
      const [header, payload, signature] = token.split('.');
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error("Error al decodificar el token JWT:", error);
      return null;
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Obtener los datos del usuario al cargar el componente
  useEffect(() => {
    const fetchUserData = () => {
      // Obtener el token JWT desde el localStorage
      const token = localStorage.getItem("token");

      if (token) {
        // Decodificar el token JWT para obtener los datos del usuario
        const decodedToken = decodeJWT(token);

        console.log(decodedToken)
        if (decodedToken) {
          setUser({
            usuario: decodedToken.name, // Suponiendo que el payload contiene "usuario"
            avatar: decodedToken.avatar,   // Suponiendo que el payload contiene "avatar"
          });
        }
      }

      setLoading(false); // Finalizar la carga
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <div>No hay usuario logueado.</div>;
  }

  return (
      <div id="profile" className="px-6 py-5">
      <p className="text-slate-500 pb-2">Bienvenido de vuelta,</p>
        <button
        onClick={toggleMenu}
            className="inline-flex space-x-2 items-center focus:outline-none">
      <a href="#" className="inline-flex space-x-2 items-center">
        <Image
          className="rounded-full"
          src={user.avatar || "/default-avatar.png"} // Usa el avatar del usuario o una imagen por defecto
          loading="lazy"
          alt="Avatar del Usuario"
          width={40}
          height={55}
        />
        <span className="text-sm md:text-base font-bold">
          {user.usuario} {/* Muestra el nombre del usuario */}
        </span>
      </a>
    </button>
    {isMenuOpen && <UserMenu onClose={() => setIsMenuOpen(false)} />}
    </div>
  );
};

export default UserHeader;