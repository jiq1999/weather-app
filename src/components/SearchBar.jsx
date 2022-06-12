import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useState } from 'react';
import Styles from './SearchBar.module.css';

export default function SearchBar({ onSearch }) {
const [cityName, setCityName] = useState("");

  function handleOnSearch(event) {
    event.preventDefault();
    if(typeof onSearch === "function") {
      onSearch(cityName);
      setCityName("");
    }
  }

  return (
    <form className={Styles.searchBar} onSubmit={handleOnSearch}>
      <input placeholder="Add a new city" value={cityName} onChange={(e) => setCityName(e.target.value)} />
      <button type="submit"><IoSearchOutline /></button>
    </form>
  )
};