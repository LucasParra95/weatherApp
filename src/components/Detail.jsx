import React, { useState, useEffect } from 'react';
import dotenv from 'dotenv';
import { useParams } from 'react-router-dom';
import './Detail.css'
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
                        min: Math.floor(recurso.main.temp_min),
                        max: Math.round(recurso.main.temp_max),
                        img: recurso.weather[0].icon,
                        id: recurso.id,
                        wind: recurso.wind.speed,
                        temp: recurso.main.temp,
                        feelsLike: recurso.main.feels_like,
                        pressure: recurso.main.pressure,
                        humidity: recurso.main.humidity,
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
                <div className="cityName">
                    <h2>{city.name}</h2>
                </div>
 
                <div className='currentWeather'>
                    <div>
                        <p>Current Temperature:</p>
                        <h1>{city.temp} °C</h1>
                    </div>
                    <div >
                        <img className="iconoClima" src={"http://openweathermap.org/img/wn/"+city.img+"@2x.png"} width="100" height="100" alt="" />
                        <h5>{city.weather}</h5>
                        <p>Cloudiness: {city.clouds}%</p>
                    </div>
                    <div>
                        <p>Wind Speed</p>
                        <h5>{Number.parseFloat(city.wind * 3.6).toFixed(2)} km/h</h5>
                        <p>Feels like</p>
                        <h5>{city.feelsLike} °C</h5>
                        <p>Humidity</p>
                        <h5>{city.humidity}%</h5>
                        <p>Pressure</p>
                        <h5>{city.pressure} hPa</h5>

                    </div>
                </div>
           
                <div className='weatherData'>
                    <div className='minMax'>
                    <h6>Min:</h6>
                    <p>{city.min}°</p>
                    </div>
                    <div className='minMax'>
                    <h6>Max:</h6>
                    <p>{city.max}°</p>
                    </div>
                    {/* <iframe src = {`https://www.openstreetmap.org/search?query=${city.latitud}%2C${city.longitud}#map=13/${city.latitud}/${city.longitud}&output=embed`}></iframe> */}
                    {/* <img src={`http://map.positionstack.com/${city.latitud},${city.longitud}`} alt="" /> */}
                </div>
            </div>
        </div>
    )
}