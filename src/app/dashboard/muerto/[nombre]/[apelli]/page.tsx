// app/dashboard/muerto/[nombre]/[apelli]/page.tsx
'use client';

import MuertoPage from '@/components/fallecidos/muertoPage';
import { useState } from 'react';
import { SimpleFallecido } from '@/components';

export default function Page({ params }: { params: { nombre: string; apelli: string } }) {
  const [fallecidos, setFallecidos] = useState<SimpleFallecido[]>([]);

  return (
    <MuertoPage setFallecidos={setFallecidos} params={{
      nombre: params.nombre || 'todos',
      apelli: params.apelli || 'todos',
    }} />
  );
}
