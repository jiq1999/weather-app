import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Cards from './components/Cards.jsx';
import City from './components/City.jsx';
import Styles from './App.module.css';

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [cities, setCities] = useState([]);

  function handleAddCity(city) {
    setCities(prevCities => {
      return [city, ...prevCities];
    })
  }

  function handleRemoveCity(cityId) {
    setCities(prevCities => {
      return prevCities.filter(city => {
        return cityId !== city.id;
      })
    })
  }

  function onSearch(city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then(r => r.json())
      .then(recurso => {
        if (cities.find(city => city.id === recurso.id)) {
          return alert("CITY ALREADY ADDED");
        } else if (recurso.main !== undefined) {
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
          handleAddCity(city);
        } else {
          alert("CITY NOT FOUND");
        }
      })
  }

  return (
      <div className={Styles.App}>
        <Routes>
          <Route path="/" element={<Cards cities={cities} onRemove={handleRemoveCity} onSearch={onSearch} />} />
          <Route path="/city/:id" element={<City />} />
        </Routes>
      </div>
  );
}

export default App;