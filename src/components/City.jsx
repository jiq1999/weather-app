import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Styles from './City.module.css';
import NavDetails from './NavDetails.jsx';
import { WiDaySunny, 
  WiNightClear, 
  WiDayCloudy, 
  WiNightAltCloudy, 
  WiCloud, 
  WiCloudy, 
  WiDayRainMix, 
  WiNightAltRainMix, 
  WiDayRain, 
  WiNightAltRain, 
  WiDayLightning, 
  WiNightAltLightning, 
  WiDaySnow, 
  WiNightAltSnow, 
  WiWindy } from "react-icons/wi";

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
                function findIcon (icon) {
                  switch (icon) {
                    case "01d":
                      return <WiDaySunny/>;
                    case "01n":
                      return <WiNightClear/>;
                    case "02d":
                      return <WiDayCloudy/>;
                    case "02n":
                      return <WiNightAltCloudy/>;
                    case "03d":
                      return <WiCloud/>;
                    case "03n":
                      return <WiCloud/>;
                    case "04d":
                      return <WiCloudy/>;
                    case "04n":
                      return <WiCloudy/>;
                    case "09d":
                      return <WiDayRainMix/>;
                    case "09n":
                      return <WiNightAltRainMix/>;
                    case "10d":
                      return <WiDayRain/>;
                    case "10n":
                      return <WiNightAltRain/>;
                    case "11d":
                      return <WiDayLightning/>;
                    case "11n":
                      return <WiNightAltLightning/>;
                    case "13d":
                      return <WiDaySnow/>;
                    case "13n":
                      return <WiNightAltSnow/>;
                    case "50d":
                      return <WiWindy/>;
                    case "50n":
                      return <WiWindy/>;
                    default:
                      break;
                  }
                }
                
                const city = {
                  date: new Date().toDateString(),
                  min: Math.round(recurso.main.temp_min),
                  max: Math.round(recurso.main.temp_max),
                  img: findIcon(recurso.weather[0].icon),
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
        return (
          <div>
            <NavDetails />
            <h1 className={Styles.title}>LOADING...</h1>
          </div>
        )
    } else if (city === null) {
        return (
          <div>
            <NavDetails />
            <h1 className={Styles.title}>404: CITY NOT FOUND</h1>
          </div>
        )
    } else {
        return (
          <div>
            <NavDetails />
            <div className={Styles.global}>
              <div className={Styles.container}>
                  <span className={Styles.date}>{city.date}</span>
                  <h2 className={Styles.cityName}>{city.name}</h2>
                  <h3 className={Styles.temp}>{city.temp}º</h3>
                  <div className={Styles.hlC}>
                    <span className={Styles.hl}>H: {city.max}º</span>
                    <span className={Styles.hl}>L: {city.min}º</span>
                  </div>
                  <span className={Styles.img}>{city.img}</span>
                  <div className={Styles.card}>
                    <div className={Styles.item}>
                      <span>Weather:</span>
                      <span>{city.weather}</span>
                    </div>
                    <hr className={Styles.line}/>
                    <div className={Styles.item}>
                      <span>Wind:</span>
                      <span>{city.wind}</span>
                    </div>
                    <hr className={Styles.line}/>
                    <div className={Styles.item}>
                      <span>Clouds:</span>
                      <span>{city.clouds}</span>
                    </div>
                  </div>
              </div>
            </div>
          </div>  
        )
    }
}