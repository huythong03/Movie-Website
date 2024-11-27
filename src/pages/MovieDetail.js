import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../utils/api';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetchMovieDetails(id)
            .then((data) => setMovie(data))
            .catch((error) => console.error(error));
    }, [id]);

    if (!movie) return <p className="text-center">Loading...</p>;

    return (
        <div className="container mt-4">
            <h1 className="text-center">{movie.title}</h1>
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="img-fluid rounded"
                    />
                </div>
                <div className="col-md-6">
                    <h4>Overview</h4>
                    <p>{movie.overview}</p>
                    <h5>Release Date: {movie.release_date}</h5>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
