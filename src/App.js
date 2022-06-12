import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cards from './components/Cards.jsx';
import City from './components/City.jsx';
import Nav from './components/Nav.jsx';

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
          handleAddCity(city);
        } else {
          alert("CITY NOT FOUND");
        }
      })
  }

  return (
      <div className="App">
        <Nav onSearch={onSearch} />
        <Routes>
          <Route path="/" element={<Cards cities={cities} onRemove={handleRemoveCity}/>} />
          <Route path="/city/:id" element={<City />} />
        </Routes>
      </div>
  );
}

export default App;