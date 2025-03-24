import { SimpleFallecido } from "@/components/interfaces/simpleFallecido";

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


export const obtenerFallecidos = async (
  pageSize: number = 10,
  page: number = 1
): Promise<SimpleFallecido[]> => {
  try {
    // Construye la URL con los parámetros de paginación
    const url = `http://localhost:4000/api/muertos/${pageSize}/${page}`;
    console.log("URL de la solicitud:", url); // Depura la URL

    // Realiza la solicitud a la API
    const response = await fetch(url, {
      cache: "force-cache",
    });

    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      console.error("Error en la respuesta de la API:", response.statusText);
      return [];
    }

    // Procesa la respuesta
    const data = await response.json();
    const fallecidos: SimpleFallecido[] = data.rows.map((fallecido: any) => ({
      id: fallecido.id!,
      name: fallecido.name!,
      apellidos: fallecido.apellidos!,
      url: fallecido.url!,
      //favorito: fallecido.favorito!,
    }));

    return fallecidos;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    return [];
  }
};
  