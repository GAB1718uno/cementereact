"use client";
import { SimpleFallecido } from "../interfaces/simpleFallecido";
import { FallecidoCard } from "./FallecidoCard";
import { useState } from "react";

interface Props {
  fallecidos: SimpleFallecido[];
  onToggleFavorite: (id: number, newFavorite: boolean) => void;
  setFallecidos: React.Dispatch<React.SetStateAction<SimpleFallecido[]>>;
}

export const FallecidoGrid = ({ fallecidos, onToggleFavorite, setFallecidos }: Props) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: number) => {
    const confirmacion = confirm("¿Seguro que quieres eliminar este fallecido?");
    if (!confirmacion) return;

    // Optimistic Update: Eliminamos antes de confirmar con el servidor
    setDeletingId(id);
    setFallecidos((prev) => prev.filter((f) => f.id !== id));

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/muertos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el fallecido");
      }
    } catch (error) {
      setError("No se pudo eliminar. Intenta nuevamente.");
      // Si hay error, revertimos el cambio
      setFallecidos((prev) => [...prev, fallecidos.find((f) => f.id === id)!]);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 items-center justify-center">
      {error && <p className="text-red-500">{error}</p>}
      {fallecidos.map((fallecido) => (
        <div className="flex flex-col items-center" key={fallecido.id}>
          <FallecidoCard
            fallecidos={fallecido}
            onToggleFavorite={onToggleFavorite}
            onDelete={() => handleDelete(fallecido.id)}
          />
          {deletingId === fallecido.id && <p className="text-gray-500">Eliminando...</p>}
        </div>
      ))}
    </div>
  );
};
