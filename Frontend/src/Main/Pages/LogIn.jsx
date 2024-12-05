import React, { useState } from 'react';
import style from '../PagesCSS/LogInSignUp.module.css';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/log-in', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Log-in successful:', data);
        navigate('/');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Log-in failed');
      }
    } catch (error) {
      console.error('Error during log-in:', error);
      setError('An error occurred while logging in');
    }
  };

  return (
    <div className={style.body}>
      <div className={style['main-container']}>
        <h1 className={style.title}>Log In</h1>
        <form onSubmit={handleSubmit}>
          <input
            className={style.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className={style.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className={style.button} type="submit">Log In</button>
        </form>
        {error && <p className={style.error}>{error}</p>}
        <p className={style.register}>
          Don't have an account?{' '} <a href="#" onClick={() => navigate('/sign-up')}>Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
