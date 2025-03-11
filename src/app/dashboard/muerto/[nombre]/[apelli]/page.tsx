import { use } from 'react';
import { obtenerFallecidoPorApellidoYNombre } from '@/app/services/fallecidoService'; // Ajusta la ruta
import {FallecidoGrid} from '@/fallecidos';

interface Props {
  params: {
    nombre: string;
    apelli: string;
  };
}

export default async function MuertoPage({ params }: Props) {
  const { nombre, apelli } = params;
  const fallecidos = await obtenerFallecidoPorApellidoYNombre(nombre, apelli);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Resultados</h2>
      {fallecidos && fallecidos.length > 0 ? (
        <FallecidoGrid fallecidos={fallecidos} />
      ) : (
        <p>No se encontró nadie con los datos propuestos</p>
      )}
    </div>
  );
}
