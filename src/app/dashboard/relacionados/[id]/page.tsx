"use client"
import { useState, useEffect } from "react";
import { SimpleFallecido } from "@/fallecidos";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FallecidoGrid } from "@/components/fallecidos/FallecidoGrid";

interface Props {
  params: { 
    id: string;
    sepult: string;
    sepulturaId: number;
  };
}

export default function RelacionadosPage({ params }: Props) {
  const [fallecidoInd, setFallecidoInd] = useState<SimpleFallecido | null>(null);
  const [fallecidosRelacionados, setFallecidosRelacionados] = useState<SimpleFallecido[]>([]);

  // Función para obtener el fallecido principal
  const obtenerFallecidoPorId = async (id: string): Promise<SimpleFallecido> => {
    try {
      const res = await fetch(`http://localhost:4000/api/muertos/${id}`, {
        cache: "force-cache",
      });
      const data = await res.json();
      console.log("Fallecido:", data);
      return data;
    } catch (error) {
      return notFound();
    }
  };

  // Función para obtener fallecidos relacionados
  const obtenerFallecidosRelacionados = async (
    id: string,
    sepult: string,
    sepulturaId: number
  ): Promise<SimpleFallecido[]> => {
    try {
      const res = await fetch(`http://localhost:4000/api/muertos/${id}/${sepult}/${sepulturaId}`, {
        cache: "force-cache",
      });
      const data = await res.json();
      console.log("Relacionados:", data);
      return data;
    } catch (error) {
      return notFound();
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    async function fetchData() {
      // Obtener el fallecido principal
      const dataFallecido = await obtenerFallecidoPorId(params.id);
      setFallecidoInd(dataFallecido);

      // Verificar que los valores necesarios estén definidos
      if (dataFallecido && dataFallecido.id && dataFallecido.sepult && dataFallecido.sepulturaId) {
        // Obtener los relacionados y filtrar para excluir el fallecido actual
        const dataRelacionados = await obtenerFallecidosRelacionados(
          dataFallecido.id.toString(),
          dataFallecido.sepult,
          dataFallecido.sepulturaId
        );
        const filtrados = dataRelacionados.filter(f => f.id !== dataFallecido.id);
        setFallecidosRelacionados(filtrados);
      } else {
        console.error("Datos del fallecido principal incompletos");
      }
    }
    fetchData();
  }, [params.id, params.sepult, params.sepulturaId]);

  // Callback para manejar el toggle de favorito en los relacionados
  const handleToggleFavorite = (id: number, newFavorite: boolean) => {
    console.log(`Toggle favorite en relacionado con id: ${id}, nuevo valor: ${newFavorite}`);
    if (!newFavorite) {
      setFallecidosRelacionados(prev => prev.filter(f => f.id !== id));
    }
    // Aquí se podría agregar más lógica, por ejemplo, actualizar el backend o notificar al usuario.
  };

  return (
    <div>
      {fallecidosRelacionados.length > 0 ? (
        <FallecidoGrid 
          fallecidos={fallecidosRelacionados} 
          onToggleFavorite={handleToggleFavorite} 
        />
      ) : (
        <p>No hay fallecidos relacionados.</p>
      )}
    </div>
  );
}