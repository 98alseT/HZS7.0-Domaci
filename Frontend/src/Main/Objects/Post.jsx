import React from 'react';
import style from '../PagesCSS/Main.module.css';
import { useNavigate } from 'react-router-dom';

const Post = ({ info, username }) => {
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/event-details/${info._id}`);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/event`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: info._id  
        }),  
        credentials: 'include',
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert('Failed to delete the event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className={style['post']} onClick={handlePostClick}>
      <img
        src={info.eventImage}
        alt="event-poster"
        className={style['event-poster']}
        onClick={handlePostClick}
      />
      <div className={style['sep']}>
        <div className={style['desc']}>
          <h1 className={style['event-name']}>{info.title}</h1>
          <p className={style['event-description']}>{info.description}</p>
        </div>
        <button className={style['join-event']}>Join</button>
        {info.user === username && (  // Check if the post's user matches the logged-in user
          <button onClick={handleDelete} className={style['join-event']}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
