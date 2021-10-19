import { useState } from 'react';
import '../App.css';
import dateBuilder from '../dateBuilder';


const api = {
  key: "1a33af827c3cd98b001d45cf4fcdefff",
  base: "http://api.openweathermap.org/data/2.5/"
}


const UserWeatherSearch = () => {

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


  if (typeof weather.main != "undefined") {
    var icon_id = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  }


    
  return (
    <div className="UserSearch">
      
      <meta name="viewport" content="initial-scale=2.0"/>
        <div className="search-box">
          <input
            type="text"
            className="search-string"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            autoComplete="off"
          />
        </div>

        <div className="full-year">{dateBuilder(new Date())}</div>

        {(typeof weather.main != "undefined") ? (

          <div className="showcase-grid">
            <div className="location-current">
              <div className="location">{weather.name}, {weather.sys.country} </div>
              <div className="current-temperature">{Math.round(weather.main.temp)}°C</div>
            </div>

            <div className="weather-img">
              <div id="icon"><img id="wicon" src={icon_id} alt="Weather icon" /></div>
            </div>
            <div className="short-text-description">Beware of {weather.weather[0].description} today</div>
          </div>
        ) : ('')}
      
    </div>
  )
}

export default UserWeatherSearch;
