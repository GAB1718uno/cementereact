import { SimpleFallecido } from "@/fallecidos";
import Image from "next/image";
import { format } from "date-fns";
import { FaCross } from "react-icons/fa";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TiStarburst } from "react-icons/ti";
import FallecidoRelacionado from "@/fallecidos/components/FallecidoRelacionado";

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

export default async function FallecidoPage({ params }: Props) {
  
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



  /* const fallecidosRelacionados = await obtenerFallecidosRelacionados(id, sepult, sepulturaId)
  console.log(fallecidosRelacionados) */
  
  return (
    <div>
      <div className=" flex border-2 border-solid border-blue-500">
        <div className=" p-2 ">
          <Image
            className=" rounded-lg shadow"
            src={url!}
            alt="avatar de fallecido en mniniatura"
            width={80}
            height={80}
          />
        </div>
        <div className=" flex flex-col p-2">
          <span className=" text-3xl font-extrabold"> {name} </span>
          <span className=" text-2xl font-sans"> {apellidos}</span>
          <div className=" flex">
            {/* Aplicado formateo de fecha a discreción */}

            <span className=" flex text-base mr-3 items-center justify-center">
              <TiStarburst className=" mr-1" />{" "}
              <span>{nacioVacio ? "D.E.P" : format(nacio!, "dd-MM-yyyy")}</span>
            </span>

            <span className=" flex text-base items-center justify-center">
              <FaCross className=" mr-1" />{" "}
              <span>{format(fallecio!, "dd-MM-yyyy")}</span>
            </span>
          </div>
        </div>
      </div>
      <span>Sepultado en: </span>
      <Image
        //Punto de interrogación para saltarse el aviso (warning) de error de type
        src={url2!}
        alt="Sepultado en"
        width={400}
        height={100}
      />
      <span className=" text-2xl text-blue-600 capitalize"> {sepult} </span>
      <br />
      <div className=" bg-transparent p-4 m-3 justify-center">


      <span className=" bg-cyan-900 text-2xl text-zinc-100 text-center"> Relacionados con { name } </span>
      <span> <FallecidoRelacionado relacionados={fallecidosRelacionados}/> </span>
      </div>
    </div>
  );
}
