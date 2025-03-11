/* import React from 'react'
import Image from 'next/image'
import { ComentarioImg } from '../comentarioImg'
import { SimpleFallecido } from '@/fallecidos'

interface Props {
  fallecidos : SimpleFallecido[]
}

export const Comentarios = ({fallecidos}: Props) => {
  //const {url} = fallecidos
  return (
    <>
    
    <div className=" flex flex-row-reverse md:mt-2 lg:mt-0 border-t-violet-950 border-double">
              
              <span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 ">
                    +5
                  </span>
                  <ComentarioImg fallecidos={ fallecidos}/>
                  <span className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                    <Image
                      className="h-full w-full rounded-full object-cover"
                      src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar2.5692c39db4f8c0ea999e.png"
                      alt=""
                      width={50}
                      height={50}
                      priority={false}
                      />
                  </span>
                  <span className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                    <Image
                      className="h-full w-full rounded-full object-cover"
                      src={fallecidos[0].url || ''}
                      alt=""
                      width={50}
                      height={50}
                      priority={false}
                      />
                  </span>
                </div>
            
                  </>
  )
} */
