import React, { useState, useEffect } from 'react';



const WeatherByGeo = () => {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);
  //  const [weatherByGeo, setWeatherByGeo] = useState({});

    const api = {
        key: "1a33af827c3cd98b001d45cf4fcdefff",
        base: "http://api.openweathermap.org/data/2.5/"
    }




    const getLocation = () => {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        } else {
            setStatus('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus(null);
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
            }, () => {
                setStatus('Unable to retrieve your location');
            });
            
        }
    }

    const apiUrlByGeo = `${api.base}weather?lat=${lat}&lon=${lng}&appid=${api.key}`;

   /* const WeatherByGeoOnLoad = () => {
        if (lat && lng !== null) {
            fetch(apiUrlByGeo)
                .then(res => res.json())
                .then(result => {
                    setWeatherByGeo(result);
                    console.log(result);
                    setLat(null);
                    setLng(null);
                })

        }
    } */

    useEffect(() => {
        console.log('init');
        getLocation();
        

    }, [])

  
    if (lat && lng !== null) {
        console.log(apiUrlByGeo);
    }
    return (
        <div className="App">
            <button>Get Location</button>
            <h1>Coordinates</h1>
            <p>{status}</p>
            {lat && <p>Latitude: {lat}</p>}
            {lng && <p>Longitude: {lng}</p>}
        </div>
    );
}

export default WeatherByGeo;