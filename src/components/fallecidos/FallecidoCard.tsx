"use client"
import Image from "next/image";
import { FavoritoButton } from "./FavoritoButton";
import RelacionadosPage from "@/app/dashboard/relacionados/[id]/page";
import { SimpleFallecido } from "../interfaces/simpleFallecido";

interface Props {
  fallecidos: SimpleFallecido;
  onToggleFavorite: (id: number, newFavorite: boolean) => void;
  onDelete: (id: number) => void; // Nueva prop
}

export const FallecidoCard = ({ fallecidos, onToggleFavorite, onDelete }: Props) => {
  const { name, apellidos, url, id, favorito } = fallecidos;

  const handleToggleFavorite = () => {
    const newFavorite = favorito !== 1;
    onToggleFavorite(id, newFavorite);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full p-4">
      <div className="relative w-full max-w-[200px] bg-slate-300 rounded-2xl shadow-lg overflow-hidden">
        <div className="relative w-full h-48">
          <Image
            src={url!}
            alt="Imagen del fallecido"
            width={200}
            height={200}
            className="object-cover w-full h-full rounded-xl"
            priority
          />
          <div className="absolute top-1 right-1">
            <FavoritoButton fallecidoId={id} initialFavorite={favorito === 1} onToggleFavorite={handleToggleFavorite} />
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-navy-700">{name}</h3>
          <p className="mt-1 text-sm text-gray-600">{apellidos}</p>
        </div>
        <div className="px-4 pb-4">
          {/* <RelacionadosPage
            params={{
              id,
              sepult: fallecidos.sepult,
              sepulturaId: fallecidos.sepulturaId,
            }}
          /> */}
        </div>
        <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200">
          <a
            href={`/dashboard/fallecido/${id}`}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-800 rounded-lg transition duration-200 hover:bg-blue-700"
          >
            Ver más...
          </a>
        <button onClick={() => onDelete(fallecidos.id)} className="bg-red-500 text-white px-2 py-1 rounded">
  🗑 Eliminar
</button>
        </div>
      </div>
    </div>
  );
};