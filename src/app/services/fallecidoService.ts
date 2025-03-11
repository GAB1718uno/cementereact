import { SimpleFallecido } from "@/fallecidos/interfaces/simpleFallecido";

export const obtenerFallecidoPorApellidoYNombre = async (
    nombre: string,
    apellidos: string
  ): Promise<SimpleFallecido[] | undefined> => {
    try {
      // Asegúrate de que tanto 'nombre' como 'apellidos' tengan valores válidos.
      const url = `http://localhost:4000/api/muertos/busqueda/${encodeURIComponent(nombre)}/${encodeURIComponent(apellidos)}`;
      const response = await fetch(url, {
        cache: "force-cache",
      });
      if (!response.ok) {
        console.error("Error en la respuesta de la API:", response.statusText);
        return [];
      }
      const fallecidos = await response.json();
      return fallecidos;
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      return [];
    }
  };
  