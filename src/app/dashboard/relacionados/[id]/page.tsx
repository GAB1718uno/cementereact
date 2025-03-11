import { SimpleFallecido } from "@/fallecidos";
import Image from "next/image";
import { format } from "date-fns";
import { FaCross } from "react-icons/fa";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TiStarburst } from "react-icons/ti";
import FallecidoRelacionado from "@/fallecidos/components/FallecidoRelacionado";
import { ComentarioImg } from "@/comentarios/comentarioImg";

// Asi es como se formatea fecha en React facilmente
/* var date = new Date("2016-01-30");
var formattedDate = format(date, "dd-MM-yyyy");
console.log(formattedDate); */

interface Props {
  params: { 
    id: any;
     sepult: any;
    sepulturaId: any };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const fallecido = await obtenerFallecidoPorId(params.id);

  try {
    return {
      title: `${fallecido.name}${" "}${fallecido.apellidos}`,
      description: `Esta página está dedicada en memoria de ${
        fallecido.name
      }${" "}${fallecido.apellidos}`,
    };
  } catch (error) {
    return {
      title: "Fallecido no encontrado",
      description: "No se encuentra fallecido con las especificaciones dadas",
    };
  }
}

const obtenerFallecidoPorId = async (id: string): Promise<SimpleFallecido> => {
  try {
    const fallecidoIndividual = await fetch(
      `http://167.71.36.17/api/muertos/${id}`,
      {
        cache: "force-cache",
        /* next: {
          revalidate: 600,
        }, */
      }
    ).then((response) => response.json());

    console.log(fallecidoIndividual);

    return fallecidoIndividual;
  } catch (error) {
    return notFound();
  }
};

const obtenerFallecidosRelacionados = async (id: any, sepult: any, sepulturaId: any): Promise<SimpleFallecido[]> => {
  try {
    const fallecidosRelacionados = await fetch(
      `http://167.71.36.17/api/muertos/${id}/${sepult}/${sepulturaId}`,
      {
        cache: "force-cache",
        /* next: {
          revalidate: 600,
        }, */
      }
    ).then((response) => response.json());

    console.log(fallecidosRelacionados);

    return fallecidosRelacionados;
  } catch (error) {
    return notFound();
  }
};

export default async function RelacionadosPage({ params }: Props)
{
  
  const fallecidoInd = await obtenerFallecidoPorId(params.id);
  /* console.log(fallecidoInd);
  
  console.log(fallecidoInd.url); */
  
  
  const {
    id,
    name,
    apellidos,
    nacio,
    fallecio,
    mote,
    url,
    url2,
    sepult,
    createdAt,
    updatedAt,
    sepulturaId,
  } = fallecidoInd;
  
  let nacioVacio = false;
  
  if (nacio === "") {
    nacioVacio = true;
  }
  
  console.log(url);
  
  
  const fallecidosRelacionadosCompleto = await obtenerFallecidosRelacionados(id, sepult, sepulturaId)
  const fallecidosRelacionados = fallecidosRelacionadosCompleto.filter(data => data.id != fallecidoInd.id)
  console.log(fallecidosRelacionados)
  
  return (
<div className=" flex flex-row-reverse md:mt-2 lg:mt-0 border-t-violet-950 border-double">
              {
                fallecidosRelacionados.length > 0 ?
                <span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 ">
                  {"+"} {
                         fallecidosRelacionados.length-1
                  }
              </span>

: <span></span>

              } 

                 {
                  fallecidosRelacionados.length > 0 ? (
                 <span className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                  {
                  <Image
                  key={fallecidosRelacionados[0].id}
                  src={fallecidosRelacionados[0].url || '' }
                  className="h-full w-full rounded-full object-cover"
                  alt=""
                  width={50}
                  height={50}
                  priority={false}
                  />
                  }

                  {/* <ComentarioImg fallecidos={fallecidosRelacionados}/> */}
                 </span>

                  ): <span></span>
                 }

                
                
                 
                </div>

  );
}
