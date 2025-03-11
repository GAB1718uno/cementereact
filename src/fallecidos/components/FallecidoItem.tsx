import React from "react";
import { SimpleFallecido } from "../interfaces/simpleFallecido";
import Image from "next/image";
import { TiStarburst } from "react-icons/ti";
import { FaCross } from "react-icons/fa";
import { format } from "date-fns";

interface Props {
  fallecidos: SimpleFallecido;
}

const FallecidoItem = ({ fallecidos }: Props) => {
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
  } = fallecidos;

  let nacioVacio = false;

  if (nacio === "") {
    nacioVacio = true;
  }

  return (
    <div className=" mb-20 mt-3 w-3/5 bg-slate-300 p-3">
      <div className=" flex border-2 border-solid border-blue-500">
        <div className=" p-2 ">
          <Image
            className=" rounded-lg shadow"
            src={url!}
            alt="avatar de fallecido en mniniatura"
            width={80}
            height={80}
            priority={false}
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
        priority={false}
      />
      <span className=" text-2xl text-blue-600 capitalize"> {sepult} </span>
    </div>
  );
};

export default FallecidoItem;
