
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Map, { MapLayerMouseEvent, Source, Layer } from 'react-map-gl';
import "../../../../node_modules/mapbox-gl/dist/mapbox-gl.css"
//import '../../../ mapbox-gl/dist/mapbox-gl.css';

interface GraveFeatureProperties {
  fid: number;
  Layer: string;
  [key: string]: any;
}

interface TooltipInfo {
  properties: GraveFeatureProperties;
  x: number;
  y: number;
  lng: number;
  lat: number;
}

export default function CemeteryMapPage() {
  const mapRef = useRef<any>(null);
  const [viewState, setViewState] = useState({ latitude: 38.33419, longitude: -0.77642, zoom: 18 });
  const [layoutData, setLayoutData] = useState<GeoJSON.FeatureCollection | null>(null);
  const [tooltipInfo, setTooltipInfo] = useState<TooltipInfo | null>(null);

 
  
  useEffect(() => {
    fetch('/cementerio_geojson.geojson')
      .then(res => res.json())
      .then(data => setLayoutData(data))
      .catch(console.error);
  }, []);

  const handleMapClick = (event: MapLayerMouseEvent) => {
    if (!event.features || event.features.length === 0) {
      setTooltipInfo(null);
      return;
    }
    
    const feature = event.features[0];
    if (feature && feature.layer?.id === 'cemetery-layer') {
      const { x, y } = event.point;
      const { lng, lat } = event.lngLat;
      setTooltipInfo({ 
        properties: feature.properties as GraveFeatureProperties, 
        x, 
        y, 
        lng, 
        lat 
      });
    } else {
      setTooltipInfo(null);
    }
  };

  if (!layoutData) return <div>Cargando plano del cementerio...</div>;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        onClick={handleMapClick}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        interactiveLayerIds={['cemetery-layer']}
        style={{ width: '100%', height: '100%' }}
      >
        <Source id="cemetery-data" type="geojson" data={layoutData}>
          <Layer
            id="cemetery-layer"
            type="fill"
            paint={{
              'fill-color': '#888',
              'fill-opacity': 0.4,
              'fill-outline-color': '#000'
            }}
          />
        </Source>
      </Map>

      
      
      {tooltipInfo && (
        <div
          style={{
            position: 'absolute',
            left: tooltipInfo.x,
            top: tooltipInfo.y,
            transform: 'translate(-50%, -120%)',
            background: 'white',
            padding: '8px 12px',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            zIndex: 999,
            pointerEvents: 'none',
          }}
        >
          <div><strong>FID:</strong> {tooltipInfo.properties.fid}</div>
          <div><strong>Layer:</strong> {tooltipInfo.properties.Layer}</div>
          <div><strong>Lng:</strong> {tooltipInfo.lng.toFixed(6)}</div>
          <div><strong>Lat:</strong> {tooltipInfo.lat.toFixed(6)}</div>
        </div>
      )}
    </div>
  );
}

