'use client';
import CemeteryLayout from '@/components/navegacion/cemeteryLayer';
import MapaNavegar from '@/components/navegacion/mapaNavegar';
import { useState, useEffect } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';

interface Grave {
  id: number;
  calle: string;
  numero: string;
  coordinates: [number, number];
  estado: 'ocupado' | 'reservado' | 'libre';
  tipo: 'nicho' | 'tierra' | 'mausoleo';
  fallecido?: {
    nombre: string;
    apellido: string;
    fechaDefuncion: string;
  };
}

export default function CemeteryMapPage() {
  const [viewState, setViewState] = useState({
    latitude: 38.33419,
    longitude: -0.77642,
    zoom: 18
  });
  const [layoutData, setLayoutData] = useState<GeoJSON.FeatureCollection | null>(null);

  const graves: Grave[] = [
    {
      id: 1,
      calle: "Principal",
      numero: "101",
      coordinates: [-0.77642, 38.33419],
      estado: "ocupado",
      tipo: "nicho",
      fallecido: {
        nombre: "Juan",
        apellido: "Pérez",
        fechaDefuncion: "2020-01-15"
      }
    }
  ];

  useEffect(() => {
    fetch('/cementerio_geojson.geojson')
      .then(res => res.json())
      .then(data => setLayoutData(data))
      .catch(console.error);
  }, []);

  if (!layoutData) return <div>Cargando plano del cementerio...</div>;

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactMapGL
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      >
        <NavigationControl position="top-left" />
        <CemeteryLayout geoJSONData={layoutData} />
        <MapaNavegar graves={graves} />
      </ReactMapGL>
    </div>
  );
}
