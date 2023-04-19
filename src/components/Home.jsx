import React, { useState } from 'react';
import '../App.css';
import Cards from './Cards.jsx';
import Nav from './Nav.jsx';


export default function Home() {
  const [cities, setCities] = useState([]);
  const apiKey = process.env.REACT_APP_API_KEY;

  function onSearch(ciudad) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`)
      .then(r => r.json())
      .then((recurso) => {
        if(recurso.main !== undefined){
          const ciudad = {
            min: Math.round(recurso.main.temp_min),
            max: Math.round(recurso.main.temp_max),
            img: recurso.weather[0].icon,
            id: recurso.id,
            wind: recurso.wind.speed,
            temp: recurso.main.temp,
            name: recurso.name,
            weather: recurso.weather[0].main,
            clouds: recurso.clouds.all,
            latitud: recurso.coord.lat,
            longitud: recurso.coord.lon
          };
          setCities(oldCities => [...oldCities, ciudad]);
        } else {
          alert("Ciudad no encontrada");
        }
      });

    }

  function onClose(id) {
    setCities(oldCities => oldCities.filter(c => c.id !== id));
  }

  return (
    <div className="Home">
      { /* Tu código acá: */ }
      <div>
        <Nav onSearch={onSearch}
        />
      </div>

      <hr />

      <div>
        <Cards cities={cities} onClose={onClose}
        />
      </div>
      
    </div>
  );
}