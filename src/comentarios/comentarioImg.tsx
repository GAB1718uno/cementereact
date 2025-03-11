import React from 'react'
import Image from "next/image"
import { SimpleFallecido } from '@/fallecidos';

interface Props {
  fallecidos : SimpleFallecido[]
}

export const ComentarioImg = ({ fallecidos }: Props) => {

let i = 100  

  return (
  
     <> 
{ fallecidos.map(
 
 
  
 comentario => 
  
  
  (



  <Image
                  key={comentario.id}
                  src={comentario.url || '' }
                  className="h-full w-full rounded-full object-cover"
                  alt=""
                  width={50}
                  height={50}
                  priority={false}
                  />
 )



)}
                
                </>

          
      
        
 )

}
