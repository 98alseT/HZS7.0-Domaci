import React from 'react';
import style from '../PagesCSS/Main.module.css';
import { useNavigate } from 'react-router-dom';

const Post = ({info}) => {
  const navigate = useNavigate();

  return (
    <div className={style['post']}>
      <img
        src={info.eventImage}
        alt="event-poster"
        className={style['event-poster']}
        onClick={() => navigate('/event-details')}
      />
      <div className={style['sep']}>
        <div className={style['desc']}>
          <h1 className={style['event-name']}>{info.title}</h1>
          <p className={style['event-description']}>{info.description}</p>
        </div>
        <button className={style['join-event']}>Join</button>
      </div>
    </div>
  );
};

export default Post;
