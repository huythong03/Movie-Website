import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../utils/api';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const favorites = useSelector((state) => state.favorites); // Lấy danh sách favorites từ Redux
    const dispatch = useDispatch();

    useEffect(() => {
        fetchMovies('/movie/popular')
            .then((data) => setMovies(data))
            .catch((error) => console.error(error));
    }, []);

    const handleFavoriteToggle = (movie) => {
        const isFavorite = favorites.some((fav) => fav.id === movie.id);
        if (isFavorite) {
            dispatch(removeFavorite(movie)); // Gỡ bỏ nếu đã là favorite
        } else {
            dispatch(addFavorite(movie)); // Thêm vào danh sách favorite
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Popular Movies</h1>
            <div className="row">
                {movies.map((movie) => {
                    const isFavorite = favorites.some((fav) => fav.id === movie.id);
                    return (
                        <div key={movie.id} className="col-md-3">
                            <div className="movie-card">
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                    className="img-fluid"
                                />
                                <h5>{movie.title}</h5>
                                <div className="d-flex justify-content-between mt-2">
                                    <Link to={`/movie/${movie.id}`}>
                                        <button className="btn btn-primary btn-sm">
                                            View Details
                                        </button>
                                    </Link>
                                    <button
                                        className={`btn btn-sm ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
                                        onClick={() => handleFavoriteToggle(movie)}
                                    >
                                        {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
