"use client"
// components/FormularioSepultura.tsx
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Sepultura } from '../interfaces/sepulturas';
import { toast } from 'react-toastify';
import Sugerencias from './sepulturaSugerencias';
import Coordenadas from './sepulturaCoordenadas';
import ImagenUploader from '../nivelApp/imageUpLoader';
import { useRouter } from 'next/navigation';
import debounce from 'lodash/debounce';

const FormularioSepultura: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<
    Omit<Sepultura, "avatar"> & { latitud?: number; longitud?: number }
  >({
    calle: "",
    numero: "",
    tipo: "sepulturas",
  });

  const [suggestions, setSuggestions] = useState<Sepultura[]>([]);
  const [termino, setTermino] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "calle") {
      setTermino(value);
      debouncedFetch(value);
    }
  };

  const fetchSuggestions = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(`/api/sepulturas?s=${query}`);
      const data = await response.json();
      setSuggestions(data.slice(0, 8));
    } catch (error) {
      console.error("Error obteniendo sugerencias", error);
      setSuggestions([]);
    }
  };

  const debouncedFetch = debounce((query: string) => {
    fetchSuggestions(query);
  }, 500);

  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  const handleSuggestionSelect = (sep: Sepultura) => {
    setFormData((prev) => ({
      ...prev,
      calle: sep.calle,
    }));
    setSuggestions([]);
  };

  const handleFileSelect = (file: File | null) => {
    setImageFile(file);
  };

  const handleCoordinates = (coords: { lat: number; lng: number }) => {
    setFormData((prev) => ({
      ...prev,
      latitud: coords.lat,
      longitud: coords.lng,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("calle", formData.calle);
      data.append("numero", formData.numero);
      data.append("tipo", formData.tipo);
      if (formData.latitud && formData.longitud) {
        data.append("latitud", String(formData.latitud));
        data.append("longitud", String(formData.longitud));
      }
      if (imageFile) data.append("avatar", imageFile);

      await fetch("/api/sepulturas", {
        method: "POST",
        body: data,
      });

      toast.success("Sepultura creada con éxito");
      router.push("/sepulturas/mostrarsep");
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar la sepultura");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
    >
      {/* Sección de Calle con sugerencias */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Calle:</label>
        <input
          type="text"
          name="calle"
          value={formData.calle}
          onChange={handleInputChange}
          autoComplete="off"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ej: Avenida Principal"
        />
        {suggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="max-h-60 overflow-y-auto"
            >

            <Sugerencias 
              suggestions={suggestions} 
              onSelect={handleSuggestionSelect}
            />

            </div>
            
          </div>
        )}
      </div>
  
      {/* Campo Número */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Número:</label>
        <input
          type="text"
          name="numero"
          value={formData.numero}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ej: 42B"
        />
      </div>
  
      {/* Componente de Coordenadas */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Ubicación:</label>
        <div className="border border-gray-300 rounded-lg overflow-hidden"> 
          
        <Coordenadas 
          onCoordinatesObtained={handleCoordinates}
        />

        </div>
        {formData.coordenadas && (
          <p className="text-sm text-gray-500">
            Coordenadas: {formData.coordenadas.lat.toFixed(6)}, {formData.coordenadas.lng.toFixed(6)}
          </p>
        )}
      </div>
  
      {/* Uploader de Imagen con Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Imagen:</label>
        <div className="w-full">
        <ImagenUploader 
          onFileSelect={handleFileSelect} 
          />

        </div>
          
        {formData.imagen && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Vista previa:</h3>
            <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={typeof formData.imagen === 'string' ? formData.imagen : URL.createObjectURL(formData.imagen)}
                alt="Preview de sepultura"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
  
      {/* Botón de Submit */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Guardando...
            </span>
          ) : (
            'Guardar Sepultura'
          )}
        </button>
      </div>
    </form>
  );
}

export default FormularioSepultura;
