import React, { useState } from 'react';
import style from '../PagesCSS/LogInSignUp.module.css';
import { useNavigate } from 'react-router-dom';
import { validateLogInForm } from './LogIn';

const LogIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLogInForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/log-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Log-in successful:', data);
        navigate('/');
        window.location.reload();
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
        <form onSubmit={handleSubmit} className={style['no-style']}>
          <input
            className={style.input}
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className={style.error}>{errors.username}</p>}

          <input
            className={style.input}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className={style.error}>{errors.password}</p>}

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
