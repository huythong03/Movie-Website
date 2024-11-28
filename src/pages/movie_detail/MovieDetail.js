import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetails, fetchMovies } from '../../utils/api';
import TrailerPlayer from '../../components/TrailerPlayer';
import './MovieDetail.css';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                setLoading(true);
                // Fetch movie details
                const movieData = await fetchMovieDetails(id);
                setMovie(movieData);

                // Fetch trailer
                const videosData = await fetchMovies(`/movie/${id}/videos`);
                const trailer = videosData.find(
                    (video) => video.type === 'Trailer' && video.site === 'YouTube'
                );
                
                if (trailer) {
                    setTrailerKey(trailer.key);
                }
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setError('Failed to load movie details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchMovieData();
    }, [id]);

    // Loading state
    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading movie details...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="error-container">
                <p>{error}</p>
                <Link to="/" className="btn-back-home">Back to Home</Link>
            </div>
        );
    }

    // No movie found
    if (!movie) {
        return (
            <div className="error-container">
                <p>No movie details found.</p>
                <Link to="/" className="btn-back-home">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="movie-detail-container">
            <div className="movie-header">
                <h1 className="movie-title">{movie.title}</h1>
            </div>
            <div className="movie-content">
                <div className="movie-poster">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="poster-image"
                    />
                </div>
                <div className="movie-info">
                    <section className="movie-overview">
                        <h3>Overview</h3>
                        <p>{movie.overview}</p>
                    </section>

                    <section className="movie-details">
                        <div className="detail-item">
                            <strong>Release Date:</strong> 
                            {new Date(movie.release_date).toLocaleDateString()}
                        </div>
                        <div className="detail-item">
                            <strong>Rating:</strong> 
                            {movie.vote_average.toFixed(1)} / 10
                        </div>
                        {movie.genres && (
                            <div className="detail-item">
                                <strong>Genres:</strong>
                                {movie.genres.map(genre => genre.name).join(', ')}
                            </div>
                        )}
                    </section>

                    {trailerKey && (
                        <section className="movie-trailer">
                            <h3>Watch Trailer</h3>
                            <TrailerPlayer videoKey={trailerKey} />
                        </section>
                    )}

                    <div className="movie-actions">
                        <Link to="/" className="btn-back-home">Back to Movies</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;