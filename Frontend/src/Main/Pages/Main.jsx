import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../PagesCSS/Main.module.css';
import PostList from '../Objects/PostList';
import Filters from '../Objects/Filters';

const Main = ({ isSideSearchVisible }) => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/display', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            typePost: 'event',
          }),
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          throw new Error('Failed to fetch all events');
        }
      } catch (error) {
        console.error('Error fetching all events:', error);
      }
    };

    fetchAllEvents();
  }, []);

  const handleSearch = (searchData) => {
    setEvents(searchData);
  };


  return (
    <main>
      <div
        className={`${style['side-search']} ${
          isSideSearchVisible ? style['side-search-visible'] : ''
        }`}>
        <Filters onSearch={handleSearch} />
        <div className={style['con-bt']}>
          <button className={`${style['dodaj-button']} ${style['dodaj-post']}`} onClick={() => navigate('/add-post')}>
            Dodaj post
          </button>
        </div>
      </div>

      <div className={style['main-info']}>
        <PostList events={events} />
      </div>
    </main>
  );
};

export default Main;
