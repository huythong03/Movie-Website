import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFavorite, clearFavorites } from '../redux/favoritesSlice';
import './Favorites.css';

const Favorites = () => {
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();
    const [confirmClear, setConfirmClear] = useState(false);

    const handleRemoveFavorite = (movie) => {
        dispatch(removeFavorite(movie));
    };

    const handleClearFavorites = () => {
        if (confirmClear) {
            dispatch(clearFavorites());
            setConfirmClear(false);
        } else {
            setConfirmClear(true);
        }
    };

    const cancelClearFavorites = () => {
        setConfirmClear(false);
    };

    return (
        <div className="favorites-container">
            <div className="favorites-header">
                <h1>Your Favorite Movies</h1>
                {favorites.length > 0 && (
                    <div className="favorites-actions">
                        {confirmClear ? (
                            <div className="confirm-clear">
                                <span>Are you sure?</span>
                                <button 
                                    className="btn-confirm-clear"
                                    onClick={handleClearFavorites}
                                >
                                    Confirm Clear
                                </button>
                                <button 
                                    className="btn-cancel-clear"
                                    onClick={cancelClearFavorites}
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button 
                                className="btn-clear-favorites"
                                onClick={handleClearFavorites}
                            >
                                Clear All Favorites
                            </button>
                        )}
                    </div>
                )}
            </div>

            {favorites.length === 0 ? (
                <div className="no-favorites">
                    <p>You haven't added any movies to favorites yet.</p>
                    <Link to="/search" className="btn-explore-movies">
                        Explore Movies
                    </Link>
                </div>
            ) : (
                <div className="favorites-grid">
                    {favorites.map((movie) => (
                        <div key={movie.id} className="favorite-movie-card">
                            <Link to={`/movie/${movie.id}`} className="movie-poster-link">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="movie-poster"
                                    onError={(e) => {
                                        e.target.src = '/placeholder-movie-poster.png';
                                    }}
                                />
                            </Link>
                            <div className="movie-details">
                                <h3 className="movie-title">
                                    {movie.title}
                                </h3>
                                <div className="movie-actions">
                                    <Link 
                                        to={`/movie/${movie.id}`} 
                                        className="btn-view-details"
                                    >
                                        View Details
                                    </Link>
                                    <button
                                        className="btn-remove-favorite"
                                        onClick={() => handleRemoveFavorite(movie)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="favorites-summary">
                <p>Total Favorite Movies: {favorites.length}</p>
            </div>
        </div>
    );
};

export default Favorites;