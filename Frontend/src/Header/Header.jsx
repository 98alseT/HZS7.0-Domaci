import React from 'react';
import style from './Header.module.css';

const Header = () => {
  return (
    <header>
      <div className={style['main-header']}>
        <img src="/path/to/logo.png" alt="logo" className={style.logo} />
        <h1 className={style['header-h1']}>EDUOBAVESTENJA</h1>
        {/*<div className={style.search}>
          <input onClick={'getwide'} type="text" className={style['search-text']} />
          <button className={style['confirm-search-button']}></button>
        </div>*/}
        <div className={style.buttons}>
          <button className={style['sign-in']}>Sign In</button>
          <button className={style['log-in']}>Log In</button>
        </div>
      </div>
    </header>
  );
};

export default Header;