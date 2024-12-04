import React from 'react';
import style from './AddPost.Module.css';

const AddPost = () => {
  return (
    <div className={style['main']}>
      <div className={style['left-section']}>
        <h1>Naziv događaja</h1>
        <div className={style['description']}>
          <p>
            Opis dogadjaja. aaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </p>
        </div>
        <div className={style['buttons']}>
          <button className={style['backButton']}>Nazad</button>
          <button className={style['includeButton']}>Uključi</button>
        </div>
      </div>
      <div className={style['rightSection']}>
        <div className={style['imageContainer']}>
          <img src={''} className={style['image']} />
        </div>
        <div className={style['details']}>
          <div className={style['locationAndTime']}>
            <span className={style['location']}>lokacija</span>
            <span className={style['time']}>vreme</span>
          </div>
          <img src={''} className={style['secondaryImage']} />
        </div>
      </div>
    </div>
  );
};

export default AddPost;
