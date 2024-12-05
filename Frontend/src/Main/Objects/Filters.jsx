import React, { useState } from 'react';
import style from '../PagesCSS/Main.module.css';

const SearchAndFilters = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    matematika: false,
    programiranje: false,
    hakatoni: false,
    robotika: false,
    vestackaInteligencija: false,
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedFilters((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const safeSearchQuery = searchQuery ? searchQuery.toLowerCase() : '';
  
      const searchResponse = await fetch('http://localhost:3000/api/Search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery: safeSearchQuery }),
        credentials: 'include',
      });
  
      if (!searchResponse.ok) {
        throw new Error('Search request failed');
      }
  
      const searchData = await searchResponse.json();
  
      const filters = Object.keys(selectedFilters).reduce((acc, key) => {
        const value = selectedFilters[key];
        acc[key] = typeof value === 'string' ? value.toLowerCase() : '';
        return acc;
      }, {});
  
      const filtersResponse = await fetch('http://localhost:3000/api/Display', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedFilters: filters, typePost: 'event' }),
        credentials: 'include',
      });
  
      if (!filtersResponse.ok) {
        throw new Error('Filters request failed');
      }
  
      const filtersData = await filtersResponse.json();
  
      const combinedResults = {
        searchResults: searchData.results,
        filterResults: filtersData.results,
      };
  
      onSearch(combinedResults);
  
    } catch (error) {
      console.error('Error submitting search and filters:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  
  

  return (
    <div className={style.search}>
      <div className={style['con']}>
        <input
          type="text"
          className={style['search-text']}
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
        <button
          className={style['confirm-search-button']}
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>

      <ul>
        <li>
          <label>
            <input
              type="checkbox"
              name="matematika"
              checked={selectedFilters.matematika}
              onChange={handleCheckboxChange}
            />
            Matematika
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              name="programiranje"
              checked={selectedFilters.programiranje}
              onChange={handleCheckboxChange}
            />
            Programiranje
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              name="hakatoni"
              checked={selectedFilters.hakatoni}
              onChange={handleCheckboxChange}
            />
            Hakatoni
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              name="robotika"
              checked={selectedFilters.robotika}
              onChange={handleCheckboxChange}
            />
            Robotika
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              name="vestackaInteligencija"
              checked={selectedFilters.vestackaInteligencija}
              onChange={handleCheckboxChange}
            />
            Veštačka inteligencija
          </label>
        </li>
      </ul>
    </div>
  );
};

export default SearchAndFilters;