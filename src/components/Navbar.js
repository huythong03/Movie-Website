import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav className="navbar">
        <ul className="nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
        </ul>
    </nav>
);

export default Navbar;
