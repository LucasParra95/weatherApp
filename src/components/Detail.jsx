import React, { useState, useEffect } from 'react';
import dotenv from 'dotenv';
import { useParams } from 'react-router-dom';
dotenv.config();



export default function Detail(){
    const [city, setCity] = useState([]);
    const apiKey = process.env.REACT_APP_API_KEY;
    const cityId = useParams();
    async function getCity(cityId) {
        try {
            await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId.id}&appid=${apiKey}&units=metric`)
            .then(r => r.json())

            .then((recurso) => {
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
                    setCity(ciudad)
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }

    useEffect(() => {
        getCity(cityId)
    }, []);

    console.log(city)
    return (
        <div className='Detail'>
            <div className="detailBody">
            <div className="name">
              <h2>{city.name}</h2>
            </div>
            <div >
              <p>Min</p>
              <p>{city.min}°</p>
            </div>
            <div >
              <p>Max</p>
              <p>{city.max}°</p>
            </div>
            <div >
              <img className="iconoClima" src={"http://openweathermap.org/img/wn/"+city.img+"@2x.png"} width="80" height="80" alt="" />
              <h5>{city.weather}</h5>
              <p>Cloudiness: {city.clouds}%</p>
            </div>
            </div>
        </div>
    )
}