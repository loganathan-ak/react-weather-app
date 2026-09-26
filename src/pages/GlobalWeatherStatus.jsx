import React, { useState, useEffect } from 'react';
import { getCitiesOfTamilnadu, fetchWeatherByCity } from '../api/weatherApi';
import Card from '../components/Card.jsx';

function GlobalWeatherStatus() {
  const [citiesWeather, setCitiesWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectLoading, setSelectLoading] = useState(false);
  const [error, setError] = useState(null);
  const [citiesList, setCitiesList] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadWeatherRecords = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Fetch Tamil Nadu cities list
        const cityList = await getCitiesOfTamilnadu();
        if (isMounted) setCitiesList(cityList);

        // 2. Slice to the top 10 major cities to stay within free API rate limits
        const targetCities = cityList.slice(0, 10);

        // 3. Fire requests concurrently
        const weatherPromises = targetCities.map((city) => fetchWeatherByCity(city));
        const results = await Promise.allSettled(weatherPromises);

        // 4. Filter only successful responses
        const successfulReports = results
          .filter((res) => res.status === 'fulfilled')
          .map((res) => res.value);

        if (isMounted) {
          setCitiesWeather(successfulReports);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Weather batch error:', err);
          setError('Failed to fetch Tamil Nadu regional weather records.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadWeatherRecords();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle dropdown selection
  const handleCitySelect = async (e) => {
    const cityName = e.target.value;
    if (!cityName) return;

    setSelectedCity(cityName);
    setSelectLoading(true);

    try {
      const cityData = await fetchWeatherByCity(cityName);

      // Option A: Prepend to the grid and remove duplicates
      setCitiesWeather((prev) => [
        cityData,
        ...prev.filter((item) => item.id !== cityData.id),
      ]);

      // If you prefer to ONLY show the selected city card, use:
      // setCitiesWeather([cityData]);
    } catch (err) {
      console.error(`Failed to fetch weather for ${cityName}:`, err);
    } finally {
      setSelectLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="status-container">
        <p>Fetching live regional weather...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-container">
        <p className="error-text">{error}</p>
      </div>
    );
  }

  return (
    <div className="status-container">
      <div className="header-action-row">
        <h2>Tamil Nadu Live Weather Records ({citiesWeather.length})</h2>

        <div className="city-selector">
          <select value={selectedCity} onChange={handleCitySelect} disabled={selectLoading}>
            <option value="">-- Choose a city to inspect --</option>
            {citiesList.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {selectLoading && <span className="inline-loader">Fetching...</span>}
        </div>
      </div>

      <div className="weather-grid">
        {citiesWeather.map((cityData) => (
          <Card key={cityData.id || cityData.name} cityData={cityData} />
        ))}
      </div>
    </div>
  );
}

export default GlobalWeatherStatus;