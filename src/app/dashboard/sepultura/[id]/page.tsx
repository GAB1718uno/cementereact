"use client"

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Sepultura } from '@/components/interfaces/sepulturas'
import { obtenerFallecidosPorSepultura, obtenerSepultura } from '@/app/services/sepulturaService'
import { FallecidoCard, SimpleFallecido } from '@/components'
import Image from 'next/image'
import GuardarSepultura from '@/components/sepulturas/sepulturaCoordenadas'

export default function SepulturaDetallePage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [sepultura, setSepultura] = useState<Sepultura | null>(null)
  const [fallecidos, setFallecidos] = useState<SimpleFallecido[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fallecidosError, setFallecidosError] = useState<string | null>(null)

  const cargarFallecidos = async (calle: string, numero: string) => {
    try {
      const data = await obtenerFallecidosPorSepultura(calle, numero)
      setFallecidos(data)
      setFallecidosError(null)
    } catch (error) {
      setFallecidos([])
      setFallecidosError(
        error instanceof Error 
          ? error.message 
          : 'Error desconocido al cargar fallecidos'
      )
    }
  }

  useEffect(() => {
    if (!id) {
      setError('ID de sepultura no proporcionado')
      setLoading(false)
      return
    }

    const cargarDatos = async () => {
      try {
        setLoading(true)
        const sepulturaData = await obtenerSepultura(id)
        setSepultura(sepulturaData)
        
        if (sepulturaData) {
          await cargarFallecidos(sepulturaData.calle!, sepulturaData.numero!)
        }
        
        setError(null)
      } catch (err) {
        console.error('Error cargando datos:', err)
        setError(err instanceof Error ? err.message : 'Error al cargar los detalles')
        setFallecidos([])
      } finally {
        setLoading(false)
      }
    }

    cargarDatos()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
        <button 
          onClick={() => router.back()} 
          className="absolute top-0 bottom-0 right-0 px-4 py-3"
          aria-label="Cerrar"
        >
          <svg className="fill-current h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <title>Cerrar</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
          </svg>
        </button>
      </div>
    )
  }

  if (!sepultura) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
        No se encontró la sepultura solicitada
        <Link href="/sepulturas" className="ml-4 text-blue-500 hover:text-blue-700">
          Volver al listado
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-teal-500 text-white p-4">
          <h1 className="text-2xl font-bold">{sepultura.calle}</h1>
          <p className="text-lg">{sepultura.numero}</p>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-center">
            {sepultura.avatar && (
              <Image
                src={sepultura.avatar}
                alt={`Sepultura ${sepultura.calle}`}
                width={0} 
                height={0} 
                sizes="100vw"
                className="w-auto h-auto max-w-full rounded-lg shadow-md"
              />
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Detalles</h2>
            <div className="space-y-3">
              {Object.entries(sepultura)
                .filter(([key]) => !['id', 'avatar'].includes(key))
                .map(([key, value]) => (
                  <div key={key} className="border-b border-gray-200 pb-2">
                    <span className="font-medium capitalize">{key}: </span>
                    <span>{value?.toString() || 'No disponible'}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-teal-500 text-white p-4">
            <h2 className="text-xl font-bold">Fallecidos en esta sepultura</h2>
          </div>
          
          <div className="p-4">
            {fallecidosError ? (
              <div className="text-red-500">{fallecidosError}</div>
            ) : fallecidos.length > 0 ? (
              <div>
                <h3>Fallecidos encontrados: {fallecidos.length}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {fallecidos.map(fallecido => (
                    <FallecidoCard 
                      key={fallecido.id} 
                      fallecidos={fallecido} 
                      onToggleFavorite={() => {}} 
                      onDelete={() => {}} 
                    />    
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No hay fallecidos registrados en esta sepultura</p>
            )}
          </div>
        </div>

        <div className="bg-gray-50 px-4 py-3 flex justify-between">
          <button
            onClick={() => router.back()}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Volver
          </button>

          <GuardarSepultura 
            onCoordinatesObtained={(coords: { lat: number; lng: number }) => {
              // Implementa esta función según tus necesidades
              console.log('Coordenadas obtenidas:', coords)
            }} 
          />

          <Link
            href={`/sepulturas/editar/${sepultura.id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Editar
          </Link>
        </div>
      </div>
    </div>
  )
}

