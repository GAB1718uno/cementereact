"use client";
import { obtenerFallecidos } from "@/app/services/fallecidoService";
import { FallecidoGrid, SimpleFallecido } from "@/components";
import { useEffect, useState } from "react";

export default function FallecidosPage() {
  const [fallecidos, setFallecidos] = useState<SimpleFallecido[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1); // Estado para la paginación

  const cargarFallecidos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerFallecidos(10, page); // Se cargan 10 por página
      setFallecidos(data);
    } catch (err) {
      setError("Error al obtener la lista de fallecidos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarFallecidos();
  }, [page]); // Se ejecuta cuando cambia la página

  const handleToggleFavorite = (id: number, newFavorite: boolean) => {
    // Implementar lógica para actualizar favoritos en el servidor
  };

  return (
    <div className="flex flex-col">
      {loading && <p>Cargando fallecidos...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          <FallecidoGrid
            fallecidos={fallecidos}
            onToggleFavorite={handleToggleFavorite}
            setFallecidos={setFallecidos}
          />
          {/* Controles de paginación */}
          <div className="flex justify-center gap-4 mt-4">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Anterior
            </button>
            <span>Página {page}</span>
            <button onClick={() => setPage(page + 1)}>Siguiente</button>
          </div>
        </>
      )}
    </div>
  );
}
