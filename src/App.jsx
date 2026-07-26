import { useState } from 'react'
import './App.css'
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fetchWeather = async (e) => {
    e.preventDefault()
    if (!city.trim()) return

    setLoading(true)
    setError('')
    setWeather(null)

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      )

      if (!response.ok) {
        throw new Error('City not found. Please try again.')
      }

      const data = await response.json()
      setWeather(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return <>
  
    <div className="weather-container">
      <h1 className="app-title">Weather App</h1>
      <p className="app-subtitle">Check real-time weather forecasts</p>

      <form onSubmit={fetchWeather} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <p className="loading-status">Fetching weather data...</p>}
      {error && <p className="error-message">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2 className="city-name">
            {weather.name}, <span className="country-code">{weather.sys.country}</span>
          </h2>

          <div className="temp-section">
            <img
              className="weather-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt={weather.weather[0].description}
            />
            <span className="temp-value">
              {Math.round(weather.main.temp)}
              <span className="temp-unit">°C</span>
            </span>
          </div>

          <p className="weather-desc">{weather.weather[0].description}</p>

          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Feels Like</span>
              <span className="detail-value">{Math.round(weather.main.feels_like)}°C</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{weather.main.humidity}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Wind</span>
              <span className="detail-value">{weather.wind.speed} m/s</span>
            </div>
          </div>
        </div>
      )}
      <footer className="app-footer">
      Made with <span className="heart-icon">❤️</span> by <span className="author-name">Sonu</span>
    </footer>
    </div>
      
  
  </>
}

export default App