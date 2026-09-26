import React from 'react';
import { getWeatherIcon } from '../assets/weatherIcons';

function Card({ cityData }) {
  if (!cityData) return null;

  const weather = cityData.weather?.[0];
  const iconSrc = weather?.icon ? getWeatherIcon(weather.icon) : null;

  return (
    <div className="weather-card">
      <div className="card-header">
        <h3>{cityData.name}</h3>
        {iconSrc && (
          <img
            src={iconSrc}
            alt={weather?.description || 'Weather condition'}
            className="weather-card-icon"
            width="48"
            height="48"
          />
        )}
      </div>

      <div className="card-body">
        <p className="temp">{Math.round(cityData.main?.temp)}°C</p>
        <p className="condition">{weather?.description}</p>
      </div>

      <div className="card-footer">
        <span className="humidity">💧 {cityData.main?.humidity}%</span>
        <span className="wind">💨 {Math.round(cityData.wind?.speed || 0)} m/s</span>
      </div>
    </div>
  );
}

export default Card;