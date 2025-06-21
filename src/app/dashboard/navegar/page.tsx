'use client';

import React, { useState, useEffect, useRef } from 'react';
import Map, { MapLayerMouseEvent, Source, Layer } from 'react-map-gl';
import "../../../../node_modules/mapbox-gl/dist/mapbox-gl.css"
import { obtenerFallecidosPorSepultura } from '@/app/services/sepulturaService';
import { FallecidoGrid, SimpleFallecido } from '@/components';

interface GraveFeatureProperties {
  fid: number;
  Layer: string;
  [key: string]: any;
}

interface TooltipInfo {
  properties: GraveFeatureProperties;
  lngLat: [number, number];
  calle?: string;
  numero?: string;
}

export default function CemeteryMapPage() {
  const mapRef = useRef<any>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [fidSelected, setFidSelected] = useState<number | null>(null);
  const [viewState, setViewState] = useState({ latitude: 38.33419, longitude: -0.77642, zoom: 16 });
  const [layoutData, setLayoutData] = useState<GeoJSON.FeatureCollection | null>(null);
  const [caminosData, setCaminosData] = useState<GeoJSON.FeatureCollection | null>(null);
  const [tooltipInfo, setTooltipInfo] = useState<TooltipInfo | null>(null);
  const [fallecidosError, setFallecidosError] = useState<string | null>(null);
  const [fallecidos, setFallecidos] = useState<SimpleFallecido[]>([]);
  const [calle, setCalle] = useState('');
  const [numero, setNumero] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch('/cementerio_geojson.geojson')
      .then(res => res.json())
      .then(data => setLayoutData(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
  fetch('/caminos_geojson.geojson')
    .then(res => res.json())
    .then(data => setCaminosData(data))
    .catch(console.error);
}, []);

  // Actualiza la posición del tooltip cuando se mueve el mapa
  useEffect(() => {
    if (!mapRef.current || !tooltipInfo) return;

    const updateTooltipPosition = () => {
      const map = mapRef.current.getMap();
      const pixel = map.project(tooltipInfo.lngLat);
      setTooltipPosition({ x: pixel.x, y: pixel.y });
    };

    updateTooltipPosition();
  }, [viewState, tooltipInfo]);

  const handleMapClick = async (event: MapLayerMouseEvent) => {
    if (!event.features || event.features.length === 0) {
      setTooltipInfo(null);
      return;
    }

    const feature = event.features[0];
    if (feature && feature.layer?.id === 'cemetery-layer') {
      const properties = feature.properties as GraveFeatureProperties;
      //Guardamos el FID seleccionado
      setFidSelected(properties.fid);
      const nuevaCalle = properties.calle || '';
      const nuevoNumero = properties.numero || '';

      setTooltipInfo({
        properties,
        lngLat: [event.lngLat.lng, event.lngLat.lat],
        calle: nuevaCalle,
        numero: nuevoNumero,
      });

      setCalle(nuevaCalle);
      setNumero(nuevoNumero);

      setFallecidos([]);
      try {
        const data = await obtenerFallecidosPorSepultura(nuevaCalle, nuevoNumero);
        setFallecidos(data);
        setFallecidosError(null);
      } catch (error) {
        setFallecidos([]);
        setFallecidosError(error instanceof Error ? error.message : 'Error desconocido');
      }
    } else {
      setTooltipInfo(null);
    }
  };

  if (!layoutData) return <div>Cargando plano del cementerio...</div>;

  function handleToggleFavorite(id: number, newFavorite: boolean): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        onClick={handleMapClick}
        mapStyle="mapbox://styles/mapbox/light-v10"
        //mapStyle="https://demotiles.maplibre.org/style.json"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        interactiveLayerIds={['cemetery-layer']}
        style={{ width: '100%', height: '100%' }}
      >
        <Source id="cemetery-data" type="geojson" data={layoutData}>
          <Layer
            id="cemetery-layer"
            type="fill"

            paint={{
    'fill-color': [
      'case',
      ['==', ['get', 'fid'], fidSelected || -1],
      '#ff5252',  // Color seleccionado
      '#e0e0e0'   // Color normal
    ],
    'fill-opacity': [
      'case',
      ['==', ['get', 'fid'], fidSelected || -1],
      0.8,  // Opacidad seleccionada
      0.5   // Opacidad normal
    ],
    'fill-outline-color': [
      'case',
      ['==', ['get', 'fid'], fidSelected || -1],
      '#ff0000', // Borde seleccionado
      '#bdbdbd'  // Borde normal
    ],
    /* 'fill-outline-width': [
      'case',
      ['==', ['get', 'fid'], selectedFid || -1],
      2,  // Borde grueso seleccionado
      1   // Borde fino normal
    ] */
  }}
            /* paint={{
      // CONDICIÓN PRINCIPAL
      'fill-color': [
        'case',
        ['==', ['get', 'fid'], tooltipInfo?.properties?.fid || -1], // Condición
        '#ff5252',  // Color sepultura seleccionada (rojo claro)
        '#e0e0e0'   // Color sepulturas normales (gris claro)
      ],
      'fill-opacity': [
        'case',
        ['==', ['get', 'fid'], tooltipInfo?.properties?.fid || -1],
        0.8,  // Opacidad alta para seleccionada
        0.5   // Opacidad media para las demás
      ],
      'fill-outline-color': [
        'case',
        ['==', ['get', 'fid'], tooltipInfo?.properties?.fid || -1],
        '#ff0000', // Borde rojo para seleccionada
        '#bdbdbd'  // Borde gris para las demás
      ]
    }} */
          />
        </Source>

        {/* {caminosData && ( */}
  <Source id="caminos-data" type="geojson" data={caminosData}>
    <Layer
      id="caminos-layer"
      type="line"
      paint={{
        'line-color': '#555',
        'line-width': 2.5,
        'line-opacity': 0.8
      }}
    />
  </Source>
{/* )} */}
      </Map>

      {tooltipInfo && (
        <div 
          ref={tooltipRef}
          style={{
            position: 'absolute',
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translate(-50%, -100%)',
            background: 'white',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            width: '280px',
            zIndex: 1000,
            pointerEvents: 'auto',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
        >
          <button
            onClick={() => setTooltipInfo(null)}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'transparent',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            ×
          </button>

          <div style={{ marginBottom: '12px' }}>
            <div><strong>FID:</strong> {tooltipInfo.properties.fid}</div>
            <div><strong>Layer:</strong> {tooltipInfo.properties.Layer}</div>
            <div><strong>Calle:</strong> {tooltipInfo.properties.calle}</div>
            <div><strong>Numero:</strong> {tooltipInfo.properties.numero}</div>
          </div>

          {fallecidos.length > 0 && fallecidos[0] && (
            <div style={{ marginBottom: '16px' }}>
              <FallecidoGrid
                fallecidos={[fallecidos[0]]}
                onToggleFavorite={handleToggleFavorite}
                setFallecidos={setFallecidos}
              />
            </div>
          )}

          <div style={{ marginTop: '12px' }}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Calle:</label>
              <input
                type="text"
                value={calle}
                onChange={(e) => setCalle(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
                autoFocus
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Número:</label>
              <input
                type="text"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>
            <button
              onClick={() => {
                if (!tooltipInfo || !layoutData) return;
                const updatedFeatures = layoutData.features.map(feature => {
                  if (feature.properties!.fid === tooltipInfo.properties.fid) {
                    feature.properties!.calle = calle;
                    feature.properties!.numero = numero;
                  }
                  return feature;
                });
                setLayoutData({ ...layoutData, features: updatedFeatures });
                setTooltipInfo(null);
              }}
              style={{
                width: '100%',
                padding: '10px',
                background: '#007AFF',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#0066CC'}
              onMouseOut={(e) => e.currentTarget.style.background = '#007AFF'}
            >
              Guardar cambios
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => {
          const blob = new Blob([JSON.stringify(layoutData, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'cementerio_enriquecido.geojson';
          a.click();
          URL.revokeObjectURL(url);
        }}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 1001,
          padding: '10px 16px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '14px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      >
        Descargar GeoJSON
      </button>
    </div>
  );
}