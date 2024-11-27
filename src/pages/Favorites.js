import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../redux/favoritesSlice';

const Favorites = () => {
    const favorites = useSelector((state) => state.favorites); // Lấy danh sách yêu thích từ Redux
    const dispatch = useDispatch();

    const handleRemoveFavorite = (movie) => {
        dispatch(removeFavorite(movie));
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Your Favorites</h1>
            <div className="row">
                {favorites.length > 0 ? (
                    favorites.map((movie) => (
                        <div key={movie.id} className="col-md-3">
                            <div className="movie-card">
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                    className="img-fluid"
                                />
                                <h5>{movie.title}</h5>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleRemoveFavorite(movie)}
                                >
                                    Remove from Favorites
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No movies in your favorites.</p>
                )}
            </div>
        </div>
    );
};

export default Favorites;
