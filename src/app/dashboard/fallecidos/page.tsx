import {
  FallecidoGrid,
  FallecidosResponse,
  SimpleFallecido,
} from "@/fallecidos";
import { notFound } from "next/navigation";

async function obtenerFallecidos (
    pageSize = 10,
    page = 1
  ): Promise<SimpleFallecido[]> {
    try {
      
      const data: FallecidosResponse = await fetch(
        `http://167.71.36.17/api/muertos/${pageSize}/${page}`
      ).then((response) => response.json());
      console.log(data);

      const fallecidos = data.rows.map((fallecido) => ({
        id: fallecido.id!,
        name: fallecido.name!,
        apellidos: fallecido.apellidos!,
        url: fallecido.url!,
      }));

      return fallecidos;
    } catch (error) {
      throw new Error("Esto no deberia estar pasando... uowwww");
    }
  };

  export default async function FallecidosPage() {

  const fallecidos = await obtenerFallecidos(100, 1);

  return (
    <div className=" flex flex-col">
      <FallecidoGrid fallecidos={fallecidos} />
    </div>
  );
}
