const API_URL = "https://rickandmortyapi.com/api/character/";

export const fetchCharacters = async (page = 1, status = "") => {
  try {
    const response = await fetch(`${API_URL}?page=${page}&status=${status}&count=20`);
    const data = await response.json();
    
    return {
      characters: data.results || [],
      totalPages: data.info.pages || 1
    };
  } catch (error) {
    console.error("Error fetching characters:", error);
    return {
      characters: [],
      totalPages: 0
    };
  }
};
