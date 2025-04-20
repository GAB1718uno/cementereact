"use client"
// components/Coordenadas.tsx
import React, { useState } from 'react';

interface CoordenadasProps {
  onCoordinatesObtained: (coords: { lat: number; lng: number }) => void;
}

const Coordenadas: React.FC<CoordenadasProps> = ({ onCoordinatesObtained }) => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const obtenerCoordenadas = () => {
    if (!navigator.geolocation) {
      alert("Geolocalización no soportada.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoords(newCoords);
        onCoordinatesObtained(newCoords);
      },
      (error) => {
        alert("Error obteniendo coordenadas: " + error.message);
      }
    );
  };

  return (
    <div>
      <button type="button" onClick={obtenerCoordenadas}>
        Obtener Coordenadas
      </button>
      {coords && (
        <p>
          Coordenadas: {coords.lat}, {coords.lng}
        </p>
      )}
    </div>
  );
};

export default Coordenadas;
