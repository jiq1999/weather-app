import React from 'react';
import Card from './Card';
import Styles from './Cards.module.css';
import Nav from './Nav.jsx';

export default function Cards({ cities, onRemove, onSearch }) {

  return (
    <div>
      <Nav onSearch={onSearch} />
      <div className={Styles.cards}>
        {
          cities?.map(city => (
            <Card
              key={city.id}
              max={city.max}
              min={city.min}
              name={city.name}
              img={city.img}
              onClose={() => onRemove(city.id)}
              id={city.id}
            />
          ))
        }
      </div>
    </div>
  )
};
