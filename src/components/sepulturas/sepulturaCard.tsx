"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Sepultura } from '../interfaces/sepulturas';

interface SepulturaCardProps {
  seps: Sepultura;
  deshabilitado?: boolean;
}

const SepulturaCard: React.FC<SepulturaCardProps> = ({ seps, deshabilitado = true }) => {
  // Si necesitas estado, decláralo aquí
  const [isLoading, setIsLoading] = React.useState(false);

  // Si necesitas hacer operaciones que actualicen estado, hazlas en useEffect
  useEffect(() => {
    // Operaciones que requieran setState aquí
    // setIsLoading(true);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full p-4">
        <div className="relative w-full max-w-[500px] bg-slate-300 rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row flex-wrap">
        {/* Hijo 1 - Imagen */}
        <div className="relative w-full h-auto">
            <img 
              src={seps.avatar} 
              alt={`Sepultura ${seps.calle}`}
              className="min-w-[70px] max-w-full max-h-[360px] rounded-3xl"
            />
        </div>

        {/* Hijo 2 - Información */}
        <div className="flex-1 bg-teal-500 text-white rounded p-2 flex flex-col justify-center items-center">
          <h3 className="text-xl font-bold m-0 pt-2">{seps.calle}</h3>
          <p className="text-sm m-0 pt-1">{seps.numero}</p>
        </div>
      </div>

      {/* Hijo 3 - Acciones */}
      <div className="flex justify-between items-center p-2">
      {/* <Link
  href={`/sepultura/${seps.id}`}
  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
>
  Ver Más...
</Link> */}
     <Link
  href={`/dashboard/sepultura/${seps.id}`}
  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
>
  Ver Más...
</Link>
        
        <Link 
          href={`/sepultura/editar/${seps.id}`}
          className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ${
            deshabilitado ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-disabled={deshabilitado}
        >
          Editar
        </Link>
      </div>
    </div>
        </div>
      
  );
};

export default SepulturaCard;