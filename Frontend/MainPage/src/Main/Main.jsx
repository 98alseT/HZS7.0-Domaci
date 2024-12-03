import React from 'react'
import style from './Main.module.css'
import Post from './Post'

const Main = () => {
  return (
    <main>
        {/*elena*/}
        <div className={style['side-search']}>
            <div className={style.search}>
                <div className={style['con']}>
                    <input type="text" className={style['search-text']} />
                    <button className={style['confirm-search-button']}></button>
                </div>
            </div>
            <ul>
                <li><label> <input type="checkbox" /> Matematika</label> </li>
                <li><label> <input type="checkbox" /> Programiranje</label> </li>
                <li><label> <input type="checkbox" /> Hakatoni</label> </li>
                <li><label> <input type="checkbox" /> Robotika</label> </li>
                <li><label> <input type="checkbox" /> Veštačka inteligencija</label> </li>
            </ul>
            <div className={style['con-bt']}>
                <button className={style['dodaj-button']}>Dodaj tag</button>
                <button className={style['dodaj-button']}>Dodaj post</button>
            </div>
        </div>

        {/*veljko*/}
        <div className={style['main-info']}>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    </main>
  )
}

export default Main