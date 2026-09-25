import { geoInstance, axiosInstance } from './axios';

// Step 1: Resolve coordinates from city name
export const getCoordinatesByCity = async (city, limit = 1) => {
  const response = await geoInstance.get('/direct', {
    params: {
      q: city,
      limit,
    },
  });
  return response.data; // Array of matching locations: [{ name, lat, lon, country, ... }]
};

// Step 2: Fetch weather using resolved coordinates
export const fetchWeatherByCoords = async (lat, lon) => {
  const response = await axiosInstance.get('/weather', {
    params: {
      lat,
      lon,
      units: 'metric',
    },
  });
  return response.data;
};

// Convenience wrapper: Geocode -> Fetch Weather
export const fetchWeatherByCity = async (city) => {
  const locations = await getCoordinatesByCity(city, 1);
  
  if (!locations || locations.length === 0) {
    throw new Error(`Location "${city}" not found.`);
  }

  const { lat, lon } = locations[0];
  return await fetchWeatherByCoords(lat, lon);
};