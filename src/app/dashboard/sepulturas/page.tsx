"use client"
import React, { useEffect, useState } from 'react';
import { obtenerSepulturas } from '@/app/services/sepulturaService';
import { Sepultura } from '@/components/interfaces/sepulturas';
import SepulturaCard from '@/components/sepulturas/sepulturaCard';

const MostrarSepulturas: React.FC = () => {
  const [sepulturas, setSepulturas] = useState<Sepultura[]>([]);

  useEffect(() => {
    const fetchSepulturas = async () => {
      const data = await obtenerSepulturas();
      setSepulturas(data);
    };

    fetchSepulturas();
  }, []);

  return (
    <div className="flex flex-wrap justify-start items-start gap-1.5 mt-1 ml-1">
      {sepulturas.map((sepultura) => (
        <div 
          key={sepultura.id}
          className="w-full sm:w-[48%] md:w-[33%] lg:w-[22%] xl:w-[20%]"
        >
          <SepulturaCard seps={sepultura} />
        </div>
      ))}
    </div>
  );
};

export default MostrarSepulturas;