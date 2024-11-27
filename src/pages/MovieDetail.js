import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovies } from '../utils/api';
import TrailerPlayer from '../components/TrailerPlayer'; // Import TrailerPlayer

const MovieDetail = () => {
    const { id } = useParams(); // Lấy id của phim từ URL
    const [movie, setMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState(''); // Lưu video key của trailer

    // Fetch thông tin chi tiết phim
    useEffect(() => {
        fetchMovieDetails(id)
            .then((data) => setMovie(data))
            .catch((error) => console.error('Error fetching movie details:', error));

        // Fetch thông tin trailer
        fetchMovies(`/movie/${id}/videos`)
            .then((data) => {
                const trailer = data.find(
                    (video) => video.type === 'Trailer' && video.site === 'YouTube'
                );
                if (trailer) {
                    setTrailerKey(trailer.key);
                }
            })
            .catch((error) => console.error('Error fetching movie videos:', error));
    }, [id]);

    // Hiển thị loading nếu chưa có dữ liệu
    if (!movie) return <p className="text-center">Loading...</p>;

    return (
        <div className="container mt-4">
            <h1 className="text-center">{movie.title}</h1>
            <div className="row">
                {/* Hình ảnh poster */}
                <div className="col-md-6">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="img-fluid rounded"
                    />
                </div>
                {/* Thông tin chi tiết phim */}
                <div className="col-md-6">
                    <h4>Overview</h4>
                    <p>{movie.overview}</p>
                    <h5>Release Date: {movie.release_date}</h5>
                    <h5>Rating: {movie.vote_average} / 10</h5>
                    {/* Phần Trailer */}
                    {trailerKey && (
                        <div className="mt-4">
                            <h4>Watch Trailer</h4>
                            <TrailerPlayer videoKey={trailerKey} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
