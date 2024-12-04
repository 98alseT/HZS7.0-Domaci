import React from 'react'
import style from './Main.module.css'
import eventImg from './testEvent.jpg'
import { useNavigate } from 'react-router-dom'

const Post = () => {
  const navigate = useNavigate();

  return (
    <div className={style['post']}>
        <img src={eventImg} alt="event-poster" className={style['event-poster']} onClick={() => navigate('/event-details')}/>
        <div className={style['sep']}>
            <div className={style['desc']}>
                <h1 className={style['event-name']}>Test Event</h1>
                <p className={style['event-description']}>Deskripcija Test Eventa</p>
            </div>
            <button className={style['join-event']}>Join</button>
        </div>
    </div>
  )
}

export default Post