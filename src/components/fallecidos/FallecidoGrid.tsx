"use client"
import { useEffect, useState } from "react";
import { SimpleFallecido } from "../interfaces/simpleFallecido";
import { FallecidoCard } from "./FallecidoCard";

interface Props {
  fallecidos: SimpleFallecido[];
  onToggleFavorite: (id: number, newFavorite: boolean) => void;
  setFallecidos: React.Dispatch<React.SetStateAction<SimpleFallecido[]>>; // 👈 Recibimos la función
}

interface Fallecido {
  id: number;
  nombre: string;
  favorito: string | number
}




export const FallecidoGrid = ({ fallecidos, onToggleFavorite, setFallecidos }: Props) => {


 /*  useEffect(() => {
    fetch("/api/fallecidos")
      .then((res) => res.json())
      .then((data) => setFallecidos(data));
  }, []);
   */

  useEffect(() => {
    const fetchFallecidos = async () => {
      try {
        const res = await fetch("http:localhost:4000/api/muertos");
        if (!res.ok) throw new Error("Error al obtener los fallecidos");
        const data = await res.json();
        setFallecidos(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchFallecidos();
  }, []);
  
  const handleDelete = async (id: number) => {
    const confirmacion = confirm("¿Seguro que quieres eliminar este fallecido?");
    if (!confirmacion) return;
  
    try {
      const response = await fetch(`http://localhost:4000/api/muertos/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Error al eliminar el fallecido");
      }
  
      // ⚡ Actualizar la lista eliminando el elemento localmente
      //setFallecidos((prev) => prev.filter((f) => f.id !== id));
       // ✅ Asegurar que el estado se actualiza correctamente
    setFallecidos((prev) => {
      const updatedFallecidos = prev.filter((f) => f.id !== id);
      return [...updatedFallecidos]; // Clonamos el array para forzar re-render
    });



    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };
  

  return (
    <div className="flex flex-wrap gap-3 items-center justify-center">
      {fallecidos.map((fallecido) => (
        <div className="flex flex-col items-center" key={fallecido.id}>
          <FallecidoCard fallecidos={fallecido} onToggleFavorite={onToggleFavorite} onDelete={handleDelete}/>
        </div>
      ))}
    </div>
  );
};