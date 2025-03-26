import React from 'react'
import { SimpleFallecido } from '../interfaces/simpleFallecido';
import { FallecidoGrid } from './FallecidoGrid';
import Image from 'next/image';
import { ComentarioImg } from '@/comentarios/comentarioImg';


interface Props {
  relacionados: SimpleFallecido[];
  onToggleFavorite: (id: number, newFavorite: boolean) => void;
  setFallecidos: React.Dispatch<React.SetStateAction<SimpleFallecido[]>>; // 👈 Recibimos la función
}

const FallecidoRelacionado = ({relacionados, onToggleFavorite, setFallecidos}: Props) => {
  return (
    <>
        <div className=" flex flex-row-reverse md:mt-2 lg:mt-0 border-t-violet-950 border-double">
              
              
                </div>
          
                <FallecidoGrid fallecidos={relacionados} onToggleFavorite={onToggleFavorite} setFallecidos={setFallecidos} />
  </>
  )
}

export default FallecidoRelacionado
