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
      console.log(city);
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      )
      
      if (!response.ok) {
        throw new Error('City not found. Please try again.')
      }

      const data = await response.json()
      console.log(data);
      
      setWeather(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }  
  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      
      <form onSubmit={fetchWeather} className="search-form">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p className="status">Fetching weather data...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <div className="temp-main">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <h3>{Math.round(weather.main.temp)}°C</h3>
          </div>
          <p className="description">{weather.weather[0].description}</p>
          
          <div className="details">
            <p><strong>Feels Like:</strong> {Math.round(weather.main.feels_like)}°C</p>
            <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App