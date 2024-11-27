import React, { useState } from 'react';
import { fetchMovies } from '../utils/api';
import MovieCard from '../components/MovieCard';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        fetchMovies(`/search/movie?query=${query}`)
            .then((data) => setResults(data))
            .catch((error) => console.error(error));
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Search Movies</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for a movie..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSearch}>
                    Search
                </button>
            </div>
            <div className="row">
                {results.map((movie) => (
                    <div key={movie.id} className="col-md-3">
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
