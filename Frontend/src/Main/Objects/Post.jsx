import React from 'react';
import img from '../../assets/testEvent.jpg';
import style from '../PagesCSS/Main.module.css';
import { useNavigate } from 'react-router-dom';

const Post = ({ info, username }) => {
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/event-details/${info._id}`);
  };

  const handleUpdate = async () => {
    navigate(`/event-update/${info._id}`);
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
    <div className={style['post']}>
      <div className={style['sep']}>
        <div className={style['desc']} onClick={handlePostClick}>
          <h1 className={style['event-name']}>{info.title}</h1>
          <p className={style['event-description']}>{info.description}</p>
        </div>
        {info.user === username && (
          <button className={style['join-event']} onClick={handleUpdate}>Update</button>
        )}
        {info.user === username && (
          <button className={style['join-event']} onClick={handleDelete}>Delete</button>
        )}
      </div>
    </div>
  );
};

export default Post;
