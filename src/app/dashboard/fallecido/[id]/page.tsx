import Image from "next/image";
import { format } from "date-fns";
import { FaCross } from "react-icons/fa";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TiStarburst } from "react-icons/ti";
import FallecidoRelacionadoWrapper from "@/components/fallecidos/FallecidoRelacionadoWrapper";
import { SimpleFallecido } from "@/components";

interface Props {
  params: {
    id: string;
    sepult: string;
    sepulturaId: string;
    favorito: number;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const fallecido = await obtenerFallecidoPorId(params.id);

  try {
    return {
      title: `${fallecido.name} ${fallecido.apellidos}`,
      description: `Esta página está dedicada en memoria de ${fallecido.name} ${fallecido.apellidos}`,
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
      `${process.env.NEXT_PUBLIC_API_URL}/muertos/${id}`,
      {
        cache: "no-store",
      }
    ).then((response) => response.json());

    console.log(fallecidoIndividual);
    return fallecidoIndividual;
  } catch (error) {
    return notFound();
  }
};

const obtenerFallecidosRelacionados = async (
  id: string | number,
  sepult: string | undefined,
  sepulturaId: number | string | null | undefined
): Promise<SimpleFallecido[]> => {
  try {
    const fallecidosRelacionados = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/muertos/${id}/${sepult}/${sepulturaId}`,
      {
        cache: "no-store",
      }
    ).then((response) => response.json());

    console.log(fallecidosRelacionados);
    return fallecidosRelacionados;
  } catch (error) {
    console.error("Error al obtener fallecidos relacionados:", error);
    return [];
  }
};

export default async function FallecidoPage({ params }: Props) {
  const fallecidoInd = await obtenerFallecidoPorId(params.id);

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
    sepulturaId,
  } = fallecidoInd;

  const nacioVacio = !nacio;

  const formattedNacio = nacio && !isNaN(new Date(nacio).getTime())
    ? format(new Date(nacio), "dd-MM-yyyy")
    : "D.E.P";

  const formattedFallecio = fallecio && !isNaN(new Date(fallecio).getTime())
    ? format(new Date(fallecio), "dd-MM-yyyy")
    : "Fecha desconocida";

  const fallecidosRelacionadosCompleto = await obtenerFallecidosRelacionados(
    id,
    sepult,
    sepulturaId
  );
  const fallecidosRelacionados = fallecidosRelacionadosCompleto?.filter(
    (data) => data.id !== fallecidoInd.id
  ) || [];

  return (
    <div>
      <div className="flex border-2 border-solid border-blue-500">
        <div className="p-2">
          <Image
            className="rounded-lg shadow"
            src={url || "/default-image.png"}
            alt="avatar de fallecido en miniatura"
            width={80}
            height={80}
          />
        </div>
        <div className="flex flex-col p-2">
          <span className="text-3xl font-extrabold">{name}</span>
          <span className="text-2xl font-sans">{apellidos}</span>
          <div className="flex">
            <span className="flex text-base mr-3 items-center justify-center">
              <TiStarburst className="mr-1" />
              <span>{formattedNacio}</span>
            </span>
            <span className="flex text-base items-center justify-center">
              <FaCross className="mr-1" />
              <span>{formattedFallecio}</span>
            </span>
          </div>
        </div>
      </div>
      <span>Sepultado en: </span>
      <Image
        src={url2 || "/default-image.png"}
        alt="Sepultado en"
        width={400}
        height={100}
      />
      <span className="text-2xl text-blue-600 capitalize">{sepult}</span>
      <br />
      <div className="bg-transparent p-4 m-3 justify-center">
        <span className="bg-cyan-900 text-2xl text-zinc-100 text-center">
          Relacionados con {name}
        </span>
        {fallecidosRelacionados.length > 0 ? (
          <FallecidoRelacionadoWrapper relacionados={fallecidosRelacionados} />
        ) : (
          <p>No hay fallecidos relacionados.</p>
        )}
      </div>
    </div>
  );
}