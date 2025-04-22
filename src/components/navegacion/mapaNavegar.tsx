/* 'use client';
import { useMemo, useCallback, useState } from 'react';
import { Marker, Popup, Source, Layer } from 'react-map-gl';
import type { MapLayerMouseEvent } from 'react-map-gl';

interface Grave {
  id: number;
  calle: string;
  numero: string;
  coordinates: [number, number]; // [lng, lat]
  estado: 'ocupado' | 'reservado' | 'libre';
  tipo: 'nicho' | 'tierra' | 'mausoleo';
  fallecido?: {
    nombre: string;
    apellido: string;
    fechaDefuncion: string;
  };
}

interface MapaNavegarProps {
  graves: Grave[];
  onGraveSelect?: (grave: Grave) => void;
}

export default function MapaNavegar({ graves, onGraveSelect }: MapaNavegarProps) {
  const [selectedGrave, setSelectedGrave] = useState<Grave | null>(null);

  const handleGraveClick = useCallback((grave: Grave, event: MapLayerMouseEvent) => {
    event.originalEvent.stopPropagation();
    setSelectedGrave(grave);
    onGraveSelect?.(grave);
  }, [onGraveSelect]);

  const gravesGeoJSON = useMemo(() => ({
    type: 'FeatureCollection' as const,
    features: graves.map(grave => ({
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: grave.coordinates
      },
      properties: {
        id: grave.id,
        estado: grave.estado,
        tipo: grave.tipo,
        calle: grave.calle,
        numero: grave.numero
      }
    }))
  }), [graves]);

  const graveLayerStyle = {
    id: 'graves',
    type: 'circle' as const,
    paint: {
      'circle-radius': 6,
      'circle-color': [
        'case',
        ['==', ['get', 'estado'], 'ocupado'], '#f44336',
        ['==', ['get', 'estado'], 'reservado'], '#ff9800',
        ['==', ['get', 'estado'], 'libre'], '#4caf50',
        '#9e9e9e'
      ] as any,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff'
    }
  };

  return (
    <>
      <Source id="grave-data" type="geojson" data={gravesGeoJSON}>
        <Layer {...graveLayerStyle} />
      </Source>

      {selectedGrave && (
        <Popup
          latitude={selectedGrave.coordinates[1]}
          longitude={selectedGrave.coordinates[0]}
          onClose={() => setSelectedGrave(null)}
          anchor="bottom"
        >
          <div className="p-2">
            <h3 className="font-bold">{selectedGrave.calle} {selectedGrave.numero}</h3>
            <p>Estado: {selectedGrave.estado}</p>
            <p>Tipo: {selectedGrave.tipo}</p>
            {selectedGrave.fallecido && (
              <div className="mt-2">
                <h4 className="font-semibold">Fallecido:</h4>
                <p>{selectedGrave.fallecido.nombre} {selectedGrave.fallecido.apellido}</p>
                <p>Fallecido: {new Date(selectedGrave.fallecido.fechaDefuncion).toLocaleDateString()}</p>
              </div>
            )}
            <button 
              className="mt-2 text-blue-500 hover:underline"
              onClick={() => {
                window.location.href = `/fallecidos/${selectedGrave.id}`;
              }}
            >
              Ver detalles completos
            </button>
          </div>
        </Popup>
      )}
    </>
  );
}
 */