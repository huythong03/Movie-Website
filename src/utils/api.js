import axios from 'axios';

const API_KEY = 'a3f8dedf305172efb02689e1b4313fc5';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (endpoint) => {
    try {
        const response = await axios.get(`${BASE_URL}${endpoint}`, {
            params: { api_key: API_KEY },
        });
        return response.data.results; // Trả về danh sách phim
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};

export const fetchMovieDetails = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
            params: { api_key: API_KEY },
        });
        return response.data; // Trả về chi tiết phim
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};
