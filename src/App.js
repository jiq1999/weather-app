import React, { useState } from 'react';
import './App.css';
import Card from './components/Card.jsx';
import Cards from './components/Cards.jsx';
import SearchBar from './components/SearchBar.jsx';
//import data, { Cairns } from './data.js';

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
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
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
      <SearchBar onSearch={onSearch} />
      <Cards cities={cities} onRemove={handleRemoveCity} />
    </div>
  );
}

export default App;