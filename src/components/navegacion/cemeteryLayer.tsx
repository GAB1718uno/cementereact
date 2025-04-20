'use client';
import { useMemo } from 'react';
import { Source, Layer } from 'react-map-gl/maplibre';
import type { LayerProps } from 'react-map-gl/maplibre';

interface CemeteryLayoutProps {
  geoJSONData: GeoJSON.FeatureCollection;
}

export default function CemeteryLayout({ geoJSONData }: CemeteryLayoutProps) {
  const layerStyle: LayerProps = useMemo(() => ({
    id: 'cemetery-layer',
    type: 'line',
    paint: {
      'line-color': '#888',
      'line-width': 2
    }
  }), []);

  return (
    <Source id="cemetery-data" type="geojson" data={geoJSONData}>
      <Layer {...layerStyle} />
    </Source>
  );
}
