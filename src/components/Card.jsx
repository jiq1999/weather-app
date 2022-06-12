import React from 'react';
import { IoIosClose } from 'react-icons/io';
import propTypes from 'prop-types';
import Styles from './Card.module.css';
import { Link } from 'react-router-dom';

export default function Card({ max, min, name, img, onClose, id }) {

  function handleOnChange() {
    if(typeof onClose === "function") onClose();
  }
  
  return (
    
      <div className={Styles.card}>
        <button className={Styles.btn} onClick={handleOnChange}><IoIosClose /></button>
        <Link to={`/city/${id}`}>
        <span className={Styles.cityName}>{name}</span>
        </Link>
        <div className={Styles.weather}>
          <span className={Styles.weatherTitle}>Min</span>
          <span className={Styles.weatherTemp}>{min}</span>
        </div>
        <div className={Styles.weather}>
          <span className={Styles.weatherTitle}>Max</span>
          <span className={Styles.weatherTemp}>{max}</span>
        </div>
        <img src={`http://openweathermap.org/img/wn/${img}@2x.png`} alt="Weather Icon"/>
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