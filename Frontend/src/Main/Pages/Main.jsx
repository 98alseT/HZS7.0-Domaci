import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../PagesCSS/Main.module.css';
import PostList from '../Objects/PostList';
import Post from '../Objects/Post';

const Main = ({ isSideSearchVisible }) => {
  const navigate = useNavigate();

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
        </div>
      </div>

      <div className={style['main-info']}>
        <PostList/>
      </div>
    </main>
  );
};

export default Main;
