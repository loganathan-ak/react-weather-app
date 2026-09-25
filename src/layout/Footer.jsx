import React from 'react';

function Footer({ onLocationCheck, onGlobalWeather }) {
  const handleLocationCheck = () => {
    if (onLocationCheck) {
      onLocationCheck();
    } else {
      console.log('Checking current location...');
    }
  };

  const handleGlobalWeather = () => {
    if (onGlobalWeather) {
      onGlobalWeather();
    } else {
      console.log('Fetching global weather records...');
    }
  };

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
            onClick={handleLocationCheck}
          >
            Check Current Location
          </button>
          <button
            type="button"
            className="btn-footer btn-secondary"
            onClick={handleGlobalWeather}
          >
            Get Global Weather Records
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;