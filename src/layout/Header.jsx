import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        {/* Brand / Logo */}
        <Link to="/" className="brand">
          <span className="brand-icon">🌤️</span>
          <span className="brand-name">Atmosphere</span>
        </Link>

        {/* Navigation Menu */}
        <nav className="menu-list">
          <ul>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/global-weather" 
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                Global Weather Status
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;