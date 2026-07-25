import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <div>
        <h2>
          Weather App
          <br/>
           <a href='https://www.accuweather.com/en/in/silcoorie-grant/3168195/weather-forecast/3168195'>click here</a>to see the weather
        </h2>
      </div>
    </>
  )
}

export default App
