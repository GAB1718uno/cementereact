'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PageBusqueda() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [apelli, setApelli] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() && !apelli.trim()) {
      toast.error("Ingresa al menos un dato para la búsqueda");
      return;
    }

    const nombreParam = nombre.trim() === '' ? 'todos' : nombre;
    const apelliParam = apelli.trim() === '' ? 'todos' : apelli;
    


    // Navega a la ruta dinámica con parámetros en el path
    router.push(`/dashboard/muerto/${encodeURIComponent(nombreParam)}/${encodeURIComponent(apelliParam)}`);
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-4">Buscar Fallecidos</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block mb-1">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="apelli" className="block mb-1">Apellido(s)</label>
          <input
            type="text"
            id="apelli"
            value={apelli}
            onChange={(e) => setApelli(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
