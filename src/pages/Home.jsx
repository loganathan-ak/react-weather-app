import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWeatherByCity, fetchWeatherByCoords } from '../api/weatherApi.js';
import { getWeatherIcon } from '../assets/weatherIcons';

export default function Home() {
  const [cityInput, setCityInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Regional quick selection cities
  const popularCities = ['Chennai', 'Pondicherry', 'Thoothukudi', 'Thiruchendur', 'Virudhunagar'];


  const handleSearchByCity = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherByCity(cityName);
      console.log(data);
      setWeatherData(data);
    } catch (err) {
      console.error('Failed to fetch weather:', err);
      setError(err.response?.data?.message || 'Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    handleSearchByCity(cityInput.trim());
  };

  // Browser Geolocation API
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await fetchWeatherByCoords(latitude, longitude);
          setWeatherData(data);
          setCityInput('');
        } catch (err) {
          console.error('Geolocation weather error:', err);
          setError('Failed to fetch weather for your location.');
        } finally {
          setLoading(false);
        }
      },
      (geoError) => {
        setLoading(false);
        setError('Location permission denied or unavailable.');
      }
    );
  };

  // Convert raw payload into display metrics
  const weatherHighlights = weatherData
    ? [
        {
          title: 'Humidity',
          value: `${weatherData.main.humidity}%`,
          desc: `Dew point & pressure: ${weatherData.main.pressure} hPa`,
        },
        {
          title: 'Wind Speed',
          value: `${weatherData.wind.speed} m/s`,
          desc: `Direction: ${weatherData.wind.deg}° ${weatherData.wind.gust ? `| Gusts: ${weatherData.wind.gust} m/s` : ''}`,
        },
        {
          title: 'Visibility',
          value: `${(weatherData.visibility / 1000).toFixed(1)} km`,
          desc: weatherData.visibility >= 10000 ? 'Clear visibility' : 'Haze or limited visibility',
        },
        {
          title: 'Cloud Cover',
          value: `${weatherData.clouds?.all ?? 0}%`,
          desc: weatherData.weather?.[0]?.description ?? 'N/A',
        },
      ]
    : [];

  return (
    <div className="home-dashboard">
      {/* 1. Hero & Search Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <span className="badge">Live Meteorological Feed</span>
          <h1 className="hero-title">Real-time Weather & Atmospheric Insights</h1>
          <p className="hero-subtitle">
            Track accurate hyper-local forecasts, monitor global storms, and view detailed atmospheric telemetry.
          </p>

          <form className="hero-search-form" onSubmit={handleSearch}>
            <input
              type="text"
              className="hero-search-input"
              placeholder="Search by city (e.g. Chennai)"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
            />
            <button type="submit" className="btn-search-hero" disabled={loading}>
              {loading ? 'Searching...' : 'Explore Forecast'}
            </button>
            <button
              type="button"
              className="btn-search-hero"
              onClick={handleCurrentLocation}
              disabled={loading}
            >
              Current Location
            </button>
          </form>

          {/* Quick city selectors */}
          <div className="quick-tags">
            <span className="quick-tag-label">Popular:</span>
            {popularCities.map((city) => (
              <button
                key={city}
                type="button"
                className="quick-tag-btn"
                onClick={() => {
                  setCityInput(city);
                  handleSearchByCity(city);
                }}
              >
                {city}
              </button>
            ))}
          </div>

          {error && <p style={{ color: '#ef4444', marginTop: '1rem' }}>{error}</p>}
        </div>
      </section>

      {/* 2. Live Weather Snapshot & Highlights */}
      {weatherData && (
        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <h2 className="section-title">
                {weatherData.name}, {weatherData.sys?.country}
              </h2>
              <span className="section-meta">
                Feels like {Math.round(weatherData.main.feels_like)}°C • {weatherData.weather?.[0]?.description}
              </span>
            </div>
            {weatherData.weather?.[0]?.icon && (
              <img
                src={getWeatherIcon(weatherData.weather[0].icon)}
                alt={weatherData.weather[0].main}
                style={{ width: '56px', height: '56px', objectFit: 'contain' }}
              />
            )}
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <span className="metric-title">Temperature</span>
              <p className="metric-value">{Math.round(weatherData.main.temp)}°C</p>
              <p className="metric-desc">
                Min: {Math.round(weatherData.main.temp_min)}°C | Max: {Math.round(weatherData.main.temp_max)}°C
              </p>
            </div>

            {weatherHighlights.map((item) => (
              <div key={item.title} className="metric-card">
                <span className="metric-title">{item.title}</span>
                <p className="metric-value">{item.value}</p>
                <p className="metric-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Core Feature Cards */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Platform Capabilities</h2>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Sub-Second Updates</h3>
            <p>Direct low-latency streams connected to radar and regional weather stations.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>Global Coverage</h3>
            <p>Over 200,000 cities and micro-regions mapped with multi-source meteorological models.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Severe Weather Alerts</h3>
            <p>Immediate push notifications for severe conditions, storms, and air quality advisories.</p>
          </div>
        </div>
      </section>
    </div>
  );
}