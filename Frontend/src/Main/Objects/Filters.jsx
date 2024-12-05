import React, { useState } from 'react';
import style from '../PagesCSS/Main.module.css';

const Filters = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Search Query:', searchQuery);
      const safeSearchQuery = searchQuery ? searchQuery.toLowerCase() : '';

      const searchResponse = await fetch('http://localhost:3000/api/Search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: safeSearchQuery }),
        credentials: 'include',
      });

      if (!searchResponse.ok) {
        throw new Error('Search request failed');
      }

      const searchData = await searchResponse.json();
      console.log('Search Data:', searchData);

      // Pass the search results to the parent component
      onSearch(searchData);
    } catch (error) {
      console.error('Error submitting search:', error);
      alert('Something went wrong with the search.');
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
    </div>
  );
};

export default Filters;
