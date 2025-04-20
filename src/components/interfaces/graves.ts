export interface Grave {
    id: number;
    nombre?: string;
    apellido?: string;
    calle: string;
    numero: string;
    estado: 'ocupado' | 'reservado' | 'libre';
    tipo: 'nicho' | 'tierra' | 'mausoleo';
    coordinates: [number, number]; // [lng, lat]
    fallecido?: {
      nombre: string;
      apellido: string;
      fechaDefuncion: string;
    };
  }