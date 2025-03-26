"use client"
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { buscarSepulturas } from '@/app/services/sepulturaService';
import { agregarFallecido } from '@/app/services/fallecidoService';

// Esquema de validación
const schema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  apellidos: z.string().min(1, 'Los apellidos son obligatorios'),
  nacio: z.string().min(1, 'La fecha de nacimiento es obligatoria'),
  fallecio: z.string().min(1, 'La fecha de fallecimiento es obligatoria'),
  mote: z.string().optional(),
  url: z.string().optional(),
  url2: z.string().optional(),
  sepult: z.string().min(1, 'La sepultura es obligatoria'),
  file: z.any(),
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

  // Debounce para buscar sepulturas
  useEffect(() => {
    if (termino.length > 2) {
      const timeout = setTimeout(() => {
        buscarSepulturasHandler(termino);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [termino]);

  const buscarSepulturasHandler = async (termino: string) => {
    try {
      const data = await buscarSepulturas(termino);
      setSepulturasSugeridas(data);
    } catch (error) {
      console.error('Error al buscar sepulturas:', error);
      setSepulturasSugeridas([]);
    }
  };

  const seleccionarSepultura = (sepultura: string) => {
    setValue('sepult', sepultura);
    setSepulturasSugeridas([]);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      
      // Agregar campos al FormData
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "file" && value !== undefined) {
          formData.append(key, String(value));
        }
      });

      // Agregar archivo si existe
      if (data.file?.[0]) {
        formData.append('file', data.file[0]);
      }

      await agregarFallecido(formData);
      
      alert('Fallecido agregado con éxito');
      router.push('/');
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

        {/* Fechas */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Nacimiento</label>
            <input type="date" {...register('nacio')} className="input" />
            {errors.nacio && <p className="text-red-500 text-sm">{errors.nacio.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Fallecimiento</label>
            <input type="date" {...register('fallecio')} className="input" />
            {errors.fallecio && <p className="text-red-500 text-sm">{errors.fallecio.message}</p>}
          </div>
        </div>

        {/* Sepultura con autocompletado */}
        <div className="relative">
          <label className="block text-sm font-medium">Sepultura</label>
          <input {...register('sepult')} className="input w-full" />
          {errors.sepult && <p className="text-red-500 text-sm">{errors.sepult.message}</p>}
          
          {sepulturasSugeridas.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-auto">
              {sepulturasSugeridas.map((s: any, index) => (
                <li
                  key={index}
                  onClick={() => seleccionarSepultura(`${s.calle}, ${s.numero}`)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {s.calle}, {s.numero}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Imagen */}
        <div>
          <label className="block text-sm font-medium">Imagen</label>
          <input
            type="file"
            {...register('file')}
            accept="image/*"
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {errors.file && (
            <p className="text-red-500 text-sm">La imagen es requerida</p>
          )}
        </div>

        {/* Botón de submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 rounded text-white ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isLoading ? 'Guardando...' : 'Agregar Fallecido'}
        </button>
      </form>
    </div>
  );
};

export default AgregarFallecido;