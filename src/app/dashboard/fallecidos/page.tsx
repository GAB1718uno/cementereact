"use client"
import { obtenerFallecidos } from "@/app/services/fallecidoService";
import { FallecidoGrid } from "@/components";
import { notFound } from "next/navigation";

export default async function FallecidosPage() {
  const fallecidos = await obtenerFallecidos(100, 1);

  const handleToggleFavorite = (id: number, newFavorite: boolean) => {
    // Aquí puedes manejar la lógica para actualizar el estado de favoritos en el servidor si es necesario
  };

  return (
    <div className="flex flex-col">
      <FallecidoGrid fallecidos={fallecidos} onToggleFavorite={handleToggleFavorite} />
    </div>
  );
}