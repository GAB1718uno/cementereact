// src/services/sepulturas.ts
import { Sepultura } from '@/components/interfaces/sepulturas';
import { fetchWithAuth } from './apiService';
import { SimpleFallecido } from '@/components';
import { log } from 'console';

export const buscarSepulturas = async (termino: string) => {
  
  
  try {
    const res = await fetchWithAuth(`/sepulturas/busqueda/${termino}`);
    console.log(res)
    const data = await res.json();
    console.log(data)
    return data.map((s:any)=>({
      calle:s.calle,
      numero:s.numero,
      avatar: s.avatar
    }))
  } catch (error) {
    console.error('Error al buscar sepulturas:', error);
    throw error;
  }
};

// app/services/sepulturaService.ts
const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://cementerio.com.es:4000/api'

export const obtenerSepulturas = async (): Promise<Sepultura[]> => {
  const response = await fetch(`${baseUrl}/sepulturas`);
  return await response.json();
};


export const obtenerSepultura = async (id: string): Promise<Sepultura> => {
  const response = await fetch(`${baseUrl}/sepulturas/${id}`)
  
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`)
  }
  
  return await response.json()
}

/* export const obtenerSepultura = async (id: string): Promise<Sepultura> => {
  const response = await fetch(`${baseUrl}/sepulturas/${id}`);
  return await response.json();
}; */

export const eliminarSepultura = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/sepulturas/${id}`, {
    method: 'DELETE'
  });
};

export const obtenerSepulturasCribadas = async (termino: string): Promise<Sepultura[]> => {
  const response = await fetch(`${baseUrl}/sepulturas/busqueda/${termino}`);
  return await response.json();
};



// app/services/fallecidoService.ts


export const obtenerFallecidosPorSepultura = async (
  calle: string, 
  numero: string
): Promise<SimpleFallecido[]> => {
  const res = await fetch(
    `${baseUrl}/muertos/sepultura/relacionados/${
      encodeURIComponent(calle)
    }/${
      encodeURIComponent(numero)
    }`
  );

  console.log(baseUrl)

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Error al obtener fallecidos');
  }

  return res.json();
};