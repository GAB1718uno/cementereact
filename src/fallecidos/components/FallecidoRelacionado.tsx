import React from 'react'
import { SimpleFallecido } from '../interfaces/simpleFallecido';
import { FallecidoGrid } from './FallecidoGrid';
import Image from 'next/image';
import { ComentarioImg } from '@/comentarios/comentarioImg';


interface Props {
    relacionados: SimpleFallecido[];
  }

const FallecidoRelacionado = ({relacionados}: Props) => {
  return (
    <>
        <div className=" flex flex-row-reverse md:mt-2 lg:mt-0 border-t-violet-950 border-double">
              
              {/* <span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 ">
                    {relacionados.length}
                  </span> */}
                  {/* {<ComentarioImg fallecidos={ relacionados}/>} */}
                  {/* <span className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                    <Image
                      className="h-full w-full rounded-full object-cover"
                      src={relacionados[0].url || ''}
                      alt=""
                      width={50}
                      height={50}
                      priority={false}
                      />
                  </span>
                  <span className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                    <Image
                      className="h-full w-full rounded-full object-cover"
                      src={relacionados[1].url || ''}
                      alt=""
                      width={50}
                      height={50}
                      priority={false}
                      />
                  </span> */}
                </div>
          
      {<FallecidoGrid fallecidos={relacionados} />}
  </>
  )
}

export default FallecidoRelacionado
