'use client';
import { useMemo } from 'react';
import { Source, Layer } from 'react-map-gl/maplibre';
import type { LayerProps, MapLayerMouseEvent } from 'react-map-gl/maplibre';


interface CemeteryLayoutProps {
  geoJSONData: GeoJSON.FeatureCollection;
  selectedFeature?: GeoJSON.Feature | null;
}

export default function CemeteryLayout({ geoJSONData, selectedFeature }: CemeteryLayoutProps) {
  const layerStyle: LayerProps = useMemo(() => ({
    id: 'cemetery-layer',
    type: 'fill',
    paint: {
      'fill-color': '#888',
      'fill-opacity': 0.4
    }
  }), []);

  const lineLayer: LayerProps = useMemo(() => ({
    id: 'cemetery-outline',
    type: 'line',
    paint: {
      'line-color': '#000000',
      'line-width': 1
    }
  }), []);

  const selectedLayerStyle: LayerProps = useMemo(() => ({
    id: 'selected-cemetery-layer',
    type: 'fill',
    paint: {
      'fill-color': '#FF5733', // rojo-anaranjado para destacar
      'fill-opacity': 0.7
    }
  }), []);

  // Si hay feature seleccionada, la convertimos en FeatureCollection
  const selectedGeoJSON: GeoJSON.FeatureCollection | null = selectedFeature
    ? {
        type: 'FeatureCollection',
        features: [selectedFeature]
      }
    : null;

  return (
    <>
      <Source id="cemetery-data" type="geojson" data={geoJSONData}>
        <Layer {...layerStyle} />
        <Layer {...lineLayer} />
      </Source>

      {selectedGeoJSON && (
        <Source id="selected-cemetery-data" type="geojson" data={selectedGeoJSON}>
          <Layer {...selectedLayerStyle} />
        </Source>
      )}
    </>
  );
}