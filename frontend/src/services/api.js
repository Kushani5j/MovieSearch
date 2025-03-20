const API_KEY = "bb189fe6b9cb5e37da1dede2b75c2edb";
const BASE_URL = "https://api.themoviedb.org/3"; // ✅ Correct base URL

export const getPopularMovies = async () => {
    if (Object.keys(genreMap).length === 0) {
        await fetchGenres(); // Ensure genres are loaded
    }

    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();

    return data.results.map(movie => ({
        ...movie,
        genres: movie.genre_ids?.map(id => genreMap[id]) || [] // ✅ Ensure genres is always an array
    }));
};


// Fetch genres and store them in a map
let genreMap = {};

export const fetchGenres = async () => {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    const data = await response.json();
    
    // Convert genre list into a dictionary for quick lookup
    genreMap = data.genres.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
    }, {});
};

export const fetchAllGenres = async () => {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    const data = await response.json();
    return data.genres; // ✅ Ensure it returns an array of genres
  };
  
export const searchMovies = async (query) => {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch search results");
    }

    const data = await response.json();
    return data.results;
};
