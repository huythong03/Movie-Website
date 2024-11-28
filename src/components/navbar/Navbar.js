import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/search', label: 'Search' },
        { path: '/favorites', label: 'Favorites' },
        { path: '/tvseries', label: 'TV Series' },
        { path: '/statistics', label: 'Statistics' }
    ];

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link className="navbar-logo" to="/" onClick={closeMenu}>
                    MovieApp
                </Link>

                <div 
                    className={`menu-icon ${isMenuOpen ? 'open' : ''}`} 
                    onClick={toggleMenu}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    {navItems.map((item) => (
                        <li 
                            key={item.path} 
                            className="nav-item"
                        >
                            <Link 
                                to={item.path} 
                                className={`nav-link ${location.pathname === item.path ? 'active-link' : ''}`}
                                onClick={closeMenu}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;