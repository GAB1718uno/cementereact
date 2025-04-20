"use client"
// pages/agregar-sepultura.tsx
import FormularioSepultura from '@/components/sepulturas/formularioSepulturas';
import React from 'react';

const AgregarSepulturaPage: React.FC = () => {
  return (
    <div>
      <h1>Agregar Sepultura</h1>
      <FormularioSepultura />
    </div>
  );
};

export default AgregarSepulturaPage;
