"use client";

import { useEffect, useRef, useState } from "react";
import tippy, { followCursor } from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // Estilos base de Tippy.js
import 'tippy.js/animations/scale.css'; // Animación opcional

interface FavoriteButtonProps {
  fallecidoId: number;
  initialFavorite: boolean;
  onToggleFavorite: () => void;
}

export const FavoritoButton = ({ fallecidoId, initialFavorite, onToggleFavorite }: FavoriteButtonProps) => {
  const [isFavorito, setIsFavorito] = useState(initialFavorite);
  const buttonRef = useRef(null); // Referencia al botón

  useEffect(() => {
    if (buttonRef.current) {
      // Inicializa Tippy.js en el botón
      tippy(buttonRef.current, {
        content: 'Añadir a favoritos', // Texto del tooltip
        placement: 'top', // Posición del tooltip (puede ser 'top', 'bottom', 'left', 'right')
        animation: 'scale', // Animación del tooltip
        arrow: true, // Muestra una flecha en el tooltip
        followCursor: false, // Si el tooltip sigue el cursor (opcional)
        delay: [50, 0], // Retraso para mostrar/ocultar el tooltip (en ms)
      });
    }
  }, []);

  const toggleFavorito = async () => {
    const newFavorito = !isFavorito;
    setIsFavorito(newFavorito);

    try {
      //const token = localStorage.getItem("token"); // Obtén el token del almacenamiento local

      const token = localStorage.getItem("token");

if (token) {
  const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica el payload del token
  const expiraEn = payload.exp * 1000; // Convierte la fecha de expiración a milisegundos
  const ahora = Date.now();

  if (ahora > expiraEn) {
    console.log("El token ha expirado");
    localStorage.removeItem("token");
    window.location.href = "../auth/login";
  } else {
    console.log("El token es válido hasta:", new Date(expiraEn));
  }
}

      console.log("Este es el token en el frontend: "+token)

      const response = await fetch(`http://localhost:4000/api/favoritos/${fallecidoId}`, {
        method: "PUT", // Cambia a PUT
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
        },
      });

      if (!response.ok) {
        throw new Error("Error en la API");
      }

      const data = await response.json();
      console.log(data); // Log para depuración

      onToggleFavorite(); // Llamar a la función onToggleFavorite después de la actualización
    } catch (error) {
      console.error("Error al actualizar el favorito:", error);
      setIsFavorito(!newFavorito); // Revertir el cambio si hay error
    }
  };



  return (
    <button
    ref={buttonRef} 
      className="absolute top-1 right-1 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer"
      onClick={toggleFavorito}
    >
      {/* Contenedor del ícono con transform: scale */}
      <div className="flex items-center justify-center rounded-full text-xl hover:bg-gray-50 transform scale-150">
        <svg
          stroke="red"
          fill={isFavorito ? "red" : "white"}
          strokeWidth="0"
          viewBox="0 0 512 512"
          height=".75em"
          width=".75em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={isFavorito ? "red" : "white"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
          ></path>
        </svg>
      </div>
  
    
    </button>
  );
};