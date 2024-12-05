import React from 'react';
import style from '../PagesCSS/AddPost.Module.css';
import img from '../../assets/testEvent.jpg';

const AddPost = () => {
  return (
    <div className={style['main']}>
      <div className={style['left-section']}>
        <h1>Naziv događaja</h1>
        <div className={style['description']}>
          <p>Opis događaja.</p>
        </div>
        <div className={style['buttons']}>
          <button className={style['backButton']}>Nazad</button>
          <button className={style['includeButton']}>Uključi</button>
        </div>
      </div>

      <div className={style['right-section']}>
        <div className={style['imageContainer']}>
          <img src={img} alt="event-photo" className={style['image']} />
        </div>
        <div className={style['details']}>
          <div className={style['locationAndTime']}>
            <span className={style['location']}>Lokacija</span>
            <span className={style['time']}>Vreme</span>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.907988175154!2d20.466712877387664!3d44.80306377730564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7aa09d8a2c09%3A0x1d63f645f7e27ac0!2sRitmi%C4%8Dka%20gimnastika!5e0!3m2!1sen!2srs!4v1733355489713!5m2!1sen!2srs"
            width="500"
            height="350"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              border: "2px solid black",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
