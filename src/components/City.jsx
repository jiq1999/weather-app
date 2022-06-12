import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const API_KEY = process.env.REACT_APP_API_KEY;

export default function City() {
    const [city, setCity] = useState(undefined);
    const params = useParams();

    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?id=${params.id}&appid=${API_KEY}&units=metric`
          )
            .then(r => r.json())
            .then(recurso => {
              if(recurso.main !== undefined) {
                const city = {
                  min: Math.round(recurso.main.temp_min),
                  max: Math.round(recurso.main.temp_max),
                  img: recurso.weather[0].icon,
                  id: recurso.id,
                  wind: recurso.wind.speed,
                  temp: recurso.main.temp,
                  name: recurso.name,
                  weather: recurso.weather[0].main,
                  clouds: recurso.clouds.all,
                  latitude: recurso.coord.lat,
                  longitud: recurso.coord.lon
                };
                setCity(city);
              } else {
                setCity(null);
              }
            })
    },[params.id])

    if (city === undefined) {
        return <h1>LOADING...</h1>
    } else if (city === null) {
        return <h1>404: CITY NOT FOUND</h1>
    } else {
        return (
            <div>
                <h2>{city.name}</h2>
                <div>
                    <span>Temp:{city.temp}</span>
                    <span>Weather:{city.weather}</span>
                    <span>Wind:{city.wind}</span>
                    <span>Clouds:{city.clouds}</span>
                    <span>Latitude:{city.latitude}º</span>
                    <span>Longitud:{city.longitud}º</span>
                </div>
            </div>
        )
    }
}