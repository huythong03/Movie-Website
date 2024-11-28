import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
    const [imageError, setImageError] = useState(false);

    // Fallback image in case poster is not available
    const posterPath = imageError || !movie.poster_path
        ? '/placeholder-movie-poster.png'
        : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const handleImageError = () => {
        setImageError(true);
    };

    // Format release year
    const getReleaseYear = () => {
        return movie.release_date 
            ? new Date(movie.release_date).getFullYear() 
            : 'N/A';
    };

    // Truncate title if too long
    const truncateTitle = (title, maxLength = 25) => {
        return title.length > maxLength 
            ? `${title.substring(0, maxLength)}...` 
            : title;
    };

    return (
        <div className="movie-card">
            <div className="movie-card-image-container">
                <img 
                    src={posterPath}
                    alt={movie.title}
                    className="movie-card-image"
                    onError={handleImageError}
                />
                {movie.vote_average > 0 && (
                    <div className="movie-rating">
                        {movie.vote_average.toFixed(1)}
                    </div>
                )}
            </div>
            <div className="movie-card-content">
                <h3 className="movie-card-title">
                    {truncateTitle(movie.title)}
                </h3>
                <div className="movie-card-details">
                    <span className="movie-year">{getReleaseYear()}</span>
                </div>
                <div className="movie-card-actions">
                    <Link 
                        to={`/movie/${movie.id}`} 
                        className="movie-details-button"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;