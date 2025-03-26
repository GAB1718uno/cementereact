// src/services/sepulturas.ts
import { fetchWithAuth } from './apiService';

export const buscarSepulturas = async (termino: string) => {
  try {
    const res = await fetchWithAuth(`/sepulturas/busqueda/${termino}`);
    return await res.json();
  } catch (error) {
    console.error('Error al buscar sepulturas:', error);
    throw error;
  }
};