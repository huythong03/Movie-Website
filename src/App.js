import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Search from './pages/search/Search';
import MovieDetail from './pages/movie_detail/MovieDetail';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

const App = () => (
    <Router>
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
            </Routes>
            <Footer />
        </div>
    </Router>
);

export default App;
