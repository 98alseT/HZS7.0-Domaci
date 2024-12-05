import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../PagesCSS/Main.module.css';
import Post from '../Objects/Post';

const Main = ({ isSideSearchVisible }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/display', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            typePost: 'event',
          }),
          credentials: 'include',
        })
        
        if (response.ok) {
          const data = await response.json();
          console.log('Events:', data);
          setEvents(data);  // Update your state with the fetched data
        } else {
          throw new Error('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setError(error.message);  // Show error in UI
      }    
    };

    fetchEvents();
  }, []);  // Empty dependency array ensures this runs only once, when the component mounts

  return (
    <main>
      <div
        className={`${style['side-search']} ${
          isSideSearchVisible ? style['side-search-visible'] : ''
        }`}>
        <div className={style.search}>
          <div className={style['con']}>
            <input type="text" className={style['search-text']} />
            <button className={style['confirm-search-button']}></button>
          </div>
        </div>
        <ul>
          <li><label><input type="checkbox" /> Matematika</label></li>
          <li><label><input type="checkbox" /> Programiranje</label></li>
          <li><label><input type="checkbox" /> Hakatoni</label></li>
          <li><label><input type="checkbox" /> Robotika</label></li>
          <li><label><input type="checkbox" /> Veštačka inteligencija</label></li>
        </ul>
        <div className={style['con-bt']}>
          <button className={`${style['dodaj-button']} ${style['dodaj-post']}`} onClick={() => navigate('/add-post')}>
            Dodaj post
          </button>
          <button className={style['dodaj-button']}>Dodaj tag</button>
        </div>
      </div>

      <div className={style['main-info']}>
        {events.length > 0 ? (
          events.map((event) => (
            <Post 
              key={event._id}  // Unique key for each post
              info={event}
            />
          ))
        ) : (
          <p>No events found.</p>  // Display if there are no events
        )}
      </div>
    </main>
  );
};

export default Main;
