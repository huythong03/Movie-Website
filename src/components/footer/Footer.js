import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { 
            name: 'GitHub', 
            icon: 'fab fa-github', 
            url: 'https://github.com/yourusername' 
        },
        { 
            name: 'LinkedIn', 
            icon: 'fab fa-linkedin', 
            url: 'https://linkedin.com/in/yourusername' 
        },
        { 
            name: 'Twitter', 
            icon: 'fab fa-twitter', 
            url: 'https://twitter.com/yourusername' 
        }
    ];

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Search', path: '/search' },
        { name: 'Favorites', path: '/favorites' },
        { name: 'TV Series', path: '/tvseries' }
    ];

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>Movie Website</h4>
                        <p>Discover and explore the world of movies and TV series.</p>
                    </div>

                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link to={link.path}>{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Connect With Us</h4>
                        <div className="social-links">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    aria-label={social.name}
                                >
                                    <i className={social.icon}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="copyright">
                        © {currentYear} Movie Website. All rights reserved.
                    </div>
                    <div className="footer-legal">
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <Link to="/terms-of-service">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;