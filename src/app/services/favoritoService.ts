// services/favoritesService.js
const userId = localStorage.getItem("userId");

export const getFavorites = async (/* userId */) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${userId}`);
    if (!response.ok) throw new Error('Error al obtener favoritos');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Nueva función para eliminar un favorito
export const removeFavorite = async (/* userId, deceasedId */) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({/*  userId, deceasedId */ })
    });

    if (!response.ok) throw new Error('Error al eliminar favorito');
  } catch (error) {
    console.error(error);
  }
};
