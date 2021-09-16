import { useState } from 'react';
import './App.css';
import dateBuilder from './dateBuilder';

const api = {
  key: "1a33af827c3cd98b001d45cf4fcdefff",
  base: "http://api.openweathermap.org/data/2.5/"
}





function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }



  return (
    <div className="App">
      <main>

        <div className="search-box">
          <input
            type="text"
            className="search-string"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        <div className="full-year">{dateBuilder(new Date())}</div>

        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-current">
              <div className="location">{weather.name}, {weather.sys.country} </div>
              <div className="current-temperature">{Math.round(weather.main.temp)}°c</div>
            </div>

            <div className="desc-img">
              <div className="short-text-description">{weather.weather[0].description}</div>
              <div className="weather-img">{weather.weather[0].icon}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  )
}

export default App;
