import React, { useState, useCallback } from 'react';
import { fetchMovies } from '../../utils/api';
import MovieCard from '../../components/movie_card/MovieCard';
import './Search.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handleSearch = useCallback(async (searchPage = 1) => {
        if (!query.trim()) {
            setError('Please enter a search term');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const data = await fetchMovies(`/search/movie?query=${query}&page=${searchPage}`);
            
            if (searchPage === 1) {
                setResults(data.results);
            } else {
                setResults(prev => [...prev, ...data.results]);
            }

            setTotalPages(data.total_pages);
            setPage(searchPage);
        } catch (error) {
            console.error(error);
            setError('Failed to fetch movies. Please try again.');
            setResults([]);
        } finally {
            setLoading(false);
        }
    }, [query]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const loadMoreMovies = () => {
        if (page < totalPages) {
            handleSearch(page + 1);
        }
    };

    return (
        <div className="search-container">
            <div className="search-header">
                <h1>Search Movies</h1>
                <div className="search-input-group">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for a movie..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button 
                        className="search-button" 
                        onClick={() => handleSearch()}
                        disabled={loading || !query.trim()}
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </div>

            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}

            {results.length > 0 && (
                <>
                    <div className="movies-grid">
                        {results.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>

                    {page < totalPages && (
                        <div className="load-more-container">
                            <button 
                                className="load-more-button"
                                onClick={loadMoreMovies}
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Load More Movies'}
                            </button>
                        </div>
                    )}
                </>
            )}

            {!loading && results.length === 0 && query && (
                <div className="no-results">
                    <p>No movies found for "{query}"</p>
                </div>
            )}

            {loading && (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
            )}
        </div>
    );
};

export default Search;