import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../../utils/api';
import { addFavorite } from '../../redux/reducers/favoritesReducer';
import MovieCard from '../../components/movie_card/MovieCard';
import './Home.css';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadMovies = async () => {
            try {
                setLoading(true);
                const data = await fetchMovies('/movie/popular');
                setMovies(data);
                setError(null);
            } catch (error) {
                console.error(error);
                setError('Failed to load movies. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, []);

    const handleAddFavorite = (movie) => {
        dispatch(addFavorite(movie));
    };

    if (loading) {
        return <div className="loading">Loading movies...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="container home-page">
            <h1 className="page-title">Popular Movies</h1>
            <div className="movies-grid">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-card-container">
                        <MovieCard movie={movie} />
                        <button
                            className="btn-add-favorite"
                            onClick={() => handleAddFavorite(movie)}
                        >
                            Add to Favorites
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;