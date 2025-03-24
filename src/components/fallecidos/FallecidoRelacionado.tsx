import React from 'react'
import { SimpleFallecido } from '../interfaces/simpleFallecido';
import { FallecidoGrid } from './FallecidoGrid';
import Image from 'next/image';
import { ComentarioImg } from '@/comentarios/comentarioImg';


interface Props {
  relacionados: SimpleFallecido[];
  onToggleFavorite: (id: number, newFavorite: boolean) => void;
}

const FallecidoRelacionado = ({relacionados, onToggleFavorite}: Props) => {
  return (
    <>
        <div className=" flex flex-row-reverse md:mt-2 lg:mt-0 border-t-violet-950 border-double">
              
              
                </div>
          
                <FallecidoGrid fallecidos={relacionados} onToggleFavorite={onToggleFavorite} />
  </>
  )
}

export default FallecidoRelacionado
