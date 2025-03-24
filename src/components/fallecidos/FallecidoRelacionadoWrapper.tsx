"use client"; // Añadir esto al inicio del archivo
import { useState } from "react";
import FallecidoRelacionado from "@/components/fallecidos/FallecidoRelacionado";
import { SimpleFallecido } from "@/components/interfaces/simpleFallecido";

interface Props {
  relacionados: SimpleFallecido[];
}

const FallecidoRelacionadoWrapper = ({ relacionados }: Props) => {
  const [fallecidos, setFallecidos] = useState(relacionados);

  const handleToggleFavorite = (id: number, newFavorite: boolean) => {
    console.log(`Toggle favorite en relacionado con id: ${id}, nuevo valor: ${newFavorite}`);
    if (!newFavorite) {
      setFallecidos((prev) => prev.filter((f) => f.id !== id));
    }
    // Aquí puedes agregar más lógica, como actualizar el backend.
  };

  return (
    <FallecidoRelacionado
      relacionados={fallecidos}
      onToggleFavorite={handleToggleFavorite}
    />
  );
};

export default FallecidoRelacionadoWrapper;