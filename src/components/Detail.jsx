import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Detail.css'




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
                        longitud: recurso.coord.lon,
                        sunrise: new Date(recurso.sys.sunrise*1000).toLocaleTimeString("en-US"),
                        sunset: new Date(recurso.sys.sunset*1000).toLocaleTimeString("en-US")
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
                        <img className="iconoClima" src={"http://openweathermap.org/img/wn/"+city.img+"@2x.png"} width="100" height="100" alt="Loading..." />
                        <h5>{city.weather}</h5>
                        <p>Cloudiness: {city.clouds}%</p>
                    </div>
                    <div>
                        <h5>Feels like</h5>
                        <p>{city.feelsLike} °C</p>

                        <h5>Wind Speed</h5>
                        <p>{Number.parseFloat(city.wind * 3.6).toFixed(2)} km/h</p>

                        <h5>Humidity</h5>
                        <p>{city.humidity}%</p>

                        <h5>Pressure</h5>
                        <p>{city.pressure} hPa</p>

                    </div>
                </div>
           
                <div className='weatherData'>
                    <div className='minMax'>
                    <h6>Min:</h6>
                    <p>{city.min}°C</p>
                    </div>
                    <div className='minMax'>
                    <h6>Max:</h6>
                    <p>{city.max}°C</p>
                    </div>
                    <div className='minMax'>
                    <h6>Sunrise:</h6>
                    <p>{city.sunrise}</p>
                    </div>
                    <div className='minMax'>
                    <h6>Sunset:</h6>
                    <p>{city.sunset}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}