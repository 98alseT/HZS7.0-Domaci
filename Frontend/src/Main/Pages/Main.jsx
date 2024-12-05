import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../PagesCSS/Main.module.css';
import PostList from '../Objects/PostList';
import Filters from '../Objects/Filters';

const Main = ({ isSideSearchVisible }) => {
  const navigate = useNavigate();

  const [results, setResults] = useState(null);

  const handleSearchResults = (filteredResults) => {
    setResults(filteredResults);
  };

  return (
    <main>
      <div
        className={`${style['side-search']} ${
          isSideSearchVisible ? style['side-search-visible'] : ''
        }`}>
        <Filters onSearch={handleSearchResults} />
        <div className={style['con-bt']}>
          <button className={`${style['dodaj-button']} ${style['dodaj-post']}`} onClick={() => navigate('/add-post')}>
            Dodaj post
          </button>
        </div>
      </div>

      <div className={style['main-info']}>
        <PostList results={results} />
      </div>
    </main>
  );
};

export default Main;
