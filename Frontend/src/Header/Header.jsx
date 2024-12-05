import React from 'react';
import style from './Header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSideSearch }) => {
  const navigate = useNavigate();

  return (
    <header>
      <div className={style['main-header']}>
        <div className={style['left-part']}>
          <div className={style['three-lines']} onClick={toggleSideSearch}>
            <div className={style['line']}></div>
            <div className={style['line']}></div>
            <div className={style['line']}></div>
          </div>
          <img src="/path/to/logo.png" alt="logo" className={style.logo} onClick={() => navigate('/')}/>
        </div>
        <h1 className={style['header-h1']}>EDUOBAVESTENJA</h1>
        <div className={style.buttons}>
          <button className={style['sign-in']} onClick={() => navigate('/sign-up')}>Sign Up</button>
          <button className={style['log-in']} onClick={() => navigate('/log-in')}>Log In</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
