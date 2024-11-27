import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../utils/api';
import { addFavorite } from '../redux/reducers/favoritesReducer';
import MovieCard from '../components/MovieCard';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchMovies('/movie/popular')
            .then((data) => setMovies(data))
            .catch((error) => console.error(error));
    }, []);

    const handleAddFavorite = (movie) => {
        dispatch(addFavorite(movie));
    };

    return (
        <div className="container mt-4 home-page">
            <h1 className="text-center">Popular Movies</h1>
            <div className="row">
                {movies.map((movie) => (
                    <div key={movie.id} className="col-md-3">
                        <MovieCard movie={movie} />
                        <button
                            className="btn btn-primary mt-2 w-100"
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
