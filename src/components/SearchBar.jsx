import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import Styles from './SearchBar.module.css';

export default function SearchBar({ onSearch }) {

  function handleOnSearch(event) {
    event.preventDefault();
    if(typeof onSearch === "function") {
      const input = document.getElementById("search-bar-input");
      onSearch(input.value);
      input.value = "";
    }
  }

  return (
    <form className={Styles.searchBar} onSubmit={handleOnSearch}>
      <input placeholder="Add a new city" id="search-bar-input" />
      <button type="submit"><IoSearchOutline /></button>
    </form>
  )
};