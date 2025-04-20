"use client"
import { useEffect, useState } from "react";
import { SimpleFallecido } from "@/components/interfaces/simpleFallecido";
import { FallecidoCard } from "@/components/fallecidos/FallecidoCard";

async function obtenerFavoritos(): Promise<SimpleFallecido[]> {
  
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`http://localhost:4000/api/favoritos`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    if (!response.ok) throw new Error("Error al obtener favoritos");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<SimpleFallecido[]>([]);

  useEffect(() => {
    obtenerFavoritos().then(setFavorites);
  }, []);

  //Aqui no se borra los fallecidos
  const handleDelete = () => {}

  const handleToggleFavorite = (id: number, newFavorite: boolean) => {
    if (!newFavorite) {
      setFavorites((prev) => prev.filter((f) => f.id !== id));
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold text-center my-4">Mis Fallecidos Favoritos</h2>
      <div className="grid grid-cols-2 gap-4">
        {favorites.length === 0 ? (
          <p>No tienes favoritos aún.</p>
        ) : (
          favorites.map((fav) => (
            <FallecidoCard key={fav.id} fallecidos={fav} onToggleFavorite={handleToggleFavorite} onDelete={handleDelete}/>
          ))
        )}
      </div>
    </div>
  );
}