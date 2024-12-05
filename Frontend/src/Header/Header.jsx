import React, { useEffect, useState } from 'react';
import style from './Header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSideSearch }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/get-username', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('User authenticated:', data);
          setIsLoggedIn(true);
          setUsername(data.username || ''); // Store the username if available
        } else {
          console.log('User not authenticated');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogOut = async () => {
    try {
      const response = await fetch('http://localhost:4000/logout', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Logged out successfully');
        setIsLoggedIn(false);
        setUsername(''); // Clear the username on logout
        navigate('/');
        window.location.reload();
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header>
      <div className={style['main-header']}>
        <div className={style['left-part']}>
          <div className={style['three-lines']} onClick={toggleSideSearch}>
            <div className={style['line']}></div>
            <div className={style['line']}></div>
            <div className={style['line']}></div>
          </div>
          <img
            src="/path/to/logo.png"
            alt="logo"
            className={style.logo}
            onClick={() => navigate('/')}
          />
        </div>
        <h1 className={style['header-h1']}>EDUOBAVESTENJA</h1>
        <div className={style.buttons}>
          {isLoggedIn ? (
            <>
              <p>{username}</p>
              <button className={style['sign-in']} onClick={handleLogOut}>Log Out</button>
            </>
          ) : (
            <>
              <button className={style['sign-in']} onClick={() => navigate('/sign-up')}>Sign Up</button>
              <button className={style['log-in']} onClick={() => navigate('/log-in')}>Log In</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
