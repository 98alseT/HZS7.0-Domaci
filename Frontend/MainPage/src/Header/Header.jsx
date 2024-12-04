import React from 'react';
import style from './Header.module.css';

const Header = ({ toggleSideSearch }) => {
  return (
    <header>
      <div className={style['main-header']}>
        <div className={style['left-part']}>
          <div className={style['three-lines']} onClick={toggleSideSearch}>
            <div className={style['line']}></div>
            <div className={style['line']}></div>
            <div className={style['line']}></div>
          </div>
          <img src="/path/to/logo.png" alt="logo" className={style.logo} />
        </div>
        <h1 className={style['header-h1']}>EDUOBAVESTENJA</h1>
        <div className={style.buttons}>
          <button className={style['sign-in']}>Sign In</button>
          <button className={style['log-in']}>Log In</button>
        </div>
      </div>
    </header>
  );
};

export default Header;