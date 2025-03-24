"use client"
import { obtenerFallecidoPorApellidoYNombre } from '@/app/services/fallecidoService'; // Ajusta la ruta
import { FallecidoGrid } from '@/components';

interface Props {
  params: {
    nombre: string;
    apelli: string;
  };
}

const handleToggleFavorite = (id: number, newFavorite: boolean) => {
  // Aquí puedes manejar la lógica para actualizar el estado de favoritos en el servidor si es necesario
};

export default async function MuertoPage({ params }: Props) {
  const { nombre, apelli } = params;
  const fallecidos = await obtenerFallecidoPorApellidoYNombre(nombre, apelli);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Resultados</h2>
      {fallecidos && fallecidos.length > 0 ? (
        <FallecidoGrid fallecidos={fallecidos} onToggleFavorite={handleToggleFavorite}/>
      ) : (
        <p>No se encontró nadie con los datos propuestos</p>
      )}
    </div>
  );
}
