import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    return (
        <div className="card">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <Link to={`/movie/${movie.id}`} className="btn btn-primary">View Details</Link>
            </div>
        </div>
    );
};

export default MovieCard;
