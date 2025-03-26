"use client"
import { obtenerFallecidos } from "@/app/services/fallecidoService";
import { FallecidoGrid, SimpleFallecido } from "@/components";
import { useEffect, useState } from "react";

export default function FallecidosPage() {

  const [fallecidos, setFallecidos] = useState<SimpleFallecido[]>([]);


 const cargarFallecidos = async() => {
   const data = await obtenerFallecidos(100, 1);
   setFallecidos(data)
}

useEffect(()=> {
  cargarFallecidos();
}, [])



  const handleToggleFavorite = (id: number, newFavorite: boolean) => {
    // Aquí puedes manejar la lógica para actualizar el estado de favoritos en el servidor si es necesario
  };

  return (
    <div className="flex flex-col">
      <FallecidoGrid fallecidos={fallecidos} onToggleFavorite={handleToggleFavorite} setFallecidos={setFallecidos} />
    </div>
  );
}