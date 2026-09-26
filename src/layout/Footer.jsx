import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="app-footer">
      <div className="footer-container">
        <p className="footer-text">
          Stay updated with real-time weather alerts, forecast patterns, and environmental insights customized for your region or explored across the globe.
        </p>

        <div className="footer-actions">
          <button
            type="button"
            className="btn-footer btn-primary"
            onClick={() => navigate('/#current-location')}
          >
            Check Current Location
          </button>

          <NavLink
            to="/global-weather"
            className="btn-footer btn-secondary"
            style={{ textDecoration: 'none' }}
          >
            Get Global Weather Records
          </NavLink>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Atmosphere Weather App. Built with OpenWeather API.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;