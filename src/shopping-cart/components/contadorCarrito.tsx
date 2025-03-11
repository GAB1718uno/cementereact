"use client";

import React, { useState } from "react";

interface Props {
  value?: number;
}

export const ContadorCarrito = ({ value = 0 }: Props) => {
  const [counter, setCounter] = useState(value);

  return (
    <>
      <span>Productos en el carrito de compras</span>
      <h1 className=" text-9xl"> {counter} </h1>
      <div className=" flex ">
        <button
          onClick={() => setCounter(counter + 1)}
          className=" flex items-center justify-center bg-blue-600 text-white hover:bg-blue-400 transition-all p-2 rounded-xl mr-2"
        >
          añadir 1
        </button>
        <button
          onClick={() => setCounter(counter - 1)}
          className=" flex items-center justify-center bg-blue-600 text-white hover:bg-blue-400 transition-all p-2 rounded-xl mr-2"
        >
          restar 1
        </button>
      </div>
    </>
  );
};
