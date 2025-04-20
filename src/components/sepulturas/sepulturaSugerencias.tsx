"use client"
// components/Sugerencias.tsx
import React from 'react';
import { Sepultura } from '../interfaces/sepulturas';

interface SugerenciasProps {
  suggestions: Sepultura[];
  onSelect: (sep: Sepultura) => void;
}

const Sugerencias: React.FC<SugerenciasProps> = ({ suggestions, onSelect }) => {
  return (
    <ul>
      {suggestions.map((sug, index) => (
        <li key={index} onClick={() => onSelect(sug)}>
          {sug.calle}, {sug.numero}
        </li>
      ))}
    </ul>
  );
};

export default Sugerencias;
