"use client"
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Esquema de validación optimizado
const schema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  apellidos: z.string().min(1, 'Los apellidos son obligatorios'),
  nacio: z.string().min(1, 'La fecha de nacimiento es obligatoria'),
  fallecio: z.string().min(1, 'La fecha de fallecimiento es obligatoria'),
  mote: z.string().optional(),
  url: z.string().optional(),
  url2: z.string().optional(),
  sepult: z.string().min(1, 'La sepultura es obligatoria'),
  imagen: z.instanceof(File, { message: 'Es obligatorio subir una imagen' }),
});

type FormValues = z.infer<typeof schema>;

const AgregarFallecido: React.FC = () => {
  const router = useRouter();
  const [sepulturasSugeridas, setSepulturasSugeridas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const termino = watch('sepult') || '';

  // Debounce para evitar múltiples llamadas a la API en poco tiempo
  useEffect(() => {
    if (termino.length > 2) {
      const timeout = setTimeout(() => buscarSepulturas(termino), 300);
      return () => clearTimeout(timeout);
    }
  }, [termino]);

  const urlBusqueda = `http://localhost:4000/api/sepulturas/busqueda/${termino}`
  console.log(urlBusqueda)


  const buscarSepulturas = async (termino: string) => {
    try {
      const res = await fetch(urlBusqueda);
      console.log(res)
      const data = await res.json();
      console.log(data)
      setSepulturasSugeridas(data);
    } catch (error) {
      console.error('Error al buscar sepulturas:', error);
    }
  };

  const seleccionarSepultura = (sepultura: string) => {
    setValue('sepult', sepultura);
    setSepulturasSugeridas([]); // Ocultar sugerencias
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value as string));

    // Construye la URL 
    const url = `http://localhost:4000/api/muertos}`;
    console.log("URL de la solicitud:", url); // Depura la URL


    try {
      const res = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('Fallecido agregado con éxito');
        router.push('/fallecidos');
      } else {
        throw new Error('Error en la respuesta del servidor');
      }
    } catch (error) {
      console.error('Error al agregar fallecido:', error);
      alert('Hubo un error al agregar el fallecido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Agregar Fallecido</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input {...register('name')} className="input" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Apellidos */}
        <div>
          <label className="block text-sm font-medium">Apellidos</label>
          <input {...register('apellidos')} className="input" />
          {errors.apellidos && <p className="text-red-500 text-sm">{errors.apellidos.message}</p>}
        </div>

        {/* Fecha de nacimiento */}
        <div>
          <label className="block text-sm font-medium">Fecha de Nacimiento</label>
          <input type="date" {...register('nacio')} className="input" />
          {errors.nacio && <p className="text-red-500 text-sm">{errors.nacio.message}</p>}
        </div>

        {/* Fecha de fallecimiento */}
        <div>
          <label className="block text-sm font-medium">Fecha de Fallecimiento</label>
          <input type="date" {...register('fallecio')} className="input" />
          {errors.fallecio && <p className="text-red-500 text-sm">{errors.fallecio.message}</p>}
        </div>

       {/* Sepultura con sugerencias */}
<div>
  <label className="block text-sm font-medium">Sepultura</label>
  <input {...register('sepult')} className="input" />
  {errors.sepult && <p className="text-red-500 text-sm">{errors.sepult.message}</p>}
  {sepulturasSugeridas.length > 0 && (
    <ul className="bg-gray-100 border p-2 rounded mt-2">
      {sepulturasSugeridas.map((s:any, index) => (
        <li
          key={index}
          onClick={() => seleccionarSepultura(`${s.calle}, ${s.numero}`)} // Asegúrate de concatenar la información que necesitas mostrar
          className="cursor-pointer py-1 px-2 hover:bg-blue-100"
        >
          {s.calle}, {s.numero} {/* Renderiza solo las propiedades que quieras mostrar */}
        </li>
      ))}
    </ul>
  )}
</div>

        {/* Imagen */}
        <div>
          <label className="block text-sm font-medium">Imagen</label>
          <input type="file" {...register('imagen')} className="input" />
          {errors.imagen && <p className="text-red-500 text-sm">{errors.imagen.message}</p>}
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isLoading ? 'Guardando...' : 'Agregar Fallecido'}
        </button>
      </form>
    </div>
  );
};

export default AgregarFallecido;
