import React, { useState } from 'react';
import { fetchMovies } from '../utils/api';

const Search = () => {
    const [query, setQuery] = useState(''); // Từ khóa tìm kiếm
    const [movies, setMovies] = useState([]); // Danh sách phim tìm được
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const [error, setError] = useState(''); // Thông báo lỗi nếu có

    // Hàm tìm kiếm phim khi người dùng nhấn nút Search
    const handleSearch = async () => {
        if (!query.trim()) return; // Nếu không có từ khóa tìm kiếm, không làm gì

        setLoading(true); // Bắt đầu trạng thái loading
        setError(''); // Reset lỗi cũ

        try {
            // Gọi API tìm kiếm phim
            const data = await fetchMovies(`/search/movie?query=${query}`);
            if (data && data.length > 0) {
                setMovies(data); // Lưu danh sách phim vào state
            } else {
                setMovies([]); // Nếu không có kết quả, đặt mảng rỗng
            }
        } catch (err) {
            setError('Error fetching movies! Please try again later.'); // Xử lý lỗi
        } finally {
            setLoading(false); // Kết thúc trạng thái loading
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Search Movies</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter movie name"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // Cập nhật từ khóa tìm kiếm
                />
                <button className="btn btn-primary" onClick={handleSearch}>
                    Search
                </button>
            </div>

            {loading && <p className="text-center">Loading...</p>} {/* Hiển thị loading khi đang tìm kiếm */}

            {error && <p className="text-center text-danger">{error}</p>} {/* Hiển thị thông báo lỗi nếu có */}

            <div className="row">
                {movies.length === 0 && !loading && !error && (
                    <p className="text-center">No movies found. Try another search.</p>
                )}

                {movies.map((movie) => (
                    <div key={movie.id} className="col-md-3">
                        <div className="movie-card">
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <h5>{movie.title}</h5>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
