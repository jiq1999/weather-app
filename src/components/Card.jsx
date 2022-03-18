import React from 'react';
import propTypes from 'prop-types';

export default function Card({ max, min, name, img, onClose }) {
  // acá va tu código
  function handleOnChange() {
    if(typeof onClose === "function") onClose();
  }
  
  return (
    <div>
      <button onClick={handleOnChange}>X</button>
      <span>{name}</span>
      <div>
        <div>
          <span>Min</span>
          <span>{min}</span>
        </div>
        <div>
          <span>Max</span>
          <span>{max}</span>
        </div>
        <img src={`http://openweathermap.org/img/wn/${img}@2x.png`} alt="Weather Icon"/>
      </div>
    </div>
  )
};

Card.propTypes = {
  max: propTypes.number,
  min: propTypes.number,
  name: propTypes.string,
  img: propTypes.string,
  onClose: propTypes.func
}