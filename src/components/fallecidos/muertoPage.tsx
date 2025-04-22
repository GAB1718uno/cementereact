'use client'

import { useEffect, useState } from 'react';
import { obtenerFallecidoPorApellidoYNombre } from '@/app/services/fallecidoService';
import { FallecidoGrid, SimpleFallecido } from '@/components';

interface Props {
  params: {
    nombre: string;
    apelli: string;
  };
  setFallecidos: React.Dispatch<React.SetStateAction<SimpleFallecido[]>>;
}

const handleToggleFavorite = (id: number, newFavorite: boolean) => {
  // lógica para actualizar favoritos
};

export default function MuertoPage({ params, setFallecidos }: Props) {
  const { nombre, apelli } = params;
  const [fallecidos, setLocalFallecidos] = useState<SimpleFallecido[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = (await obtenerFallecidoPorApellidoYNombre(nombre, apelli)) || [];
      setLocalFallecidos(data);
      setFallecidos(data); // actualizas también en el componente padre
    };
    fetchData();
  }, [nombre, apelli, setFallecidos]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Resultados</h2>
      {fallecidos && fallecidos.length > 0 ? (
        <FallecidoGrid fallecidos={fallecidos} onToggleFavorite={handleToggleFavorite} setFallecidos={setFallecidos} />
      ) : (
        <p>No se encontró nadie con los datos propuestos</p>
      )}
    </div>
  );
}
