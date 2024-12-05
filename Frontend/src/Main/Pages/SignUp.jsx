import React, { useState } from 'react';
import style from '../PagesCSS/LogInSignUp.module.css';
import { useNavigate } from 'react-router-dom';
import { validateForm} from './LogInSignUp';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Sign-Up successful:', data);
        navigate('/');
        window.location.reload();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Sign-Up failed');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setError('An error occurred while signing up');
    }
  };

  return (
    <div className={style.body}>
      <div className={style['main-container']}>
        <h1 className={style.title}>Sign Up</h1>
        <form onSubmit={handleSubmit} className={style['no-style']}>
          <input
            className={style.input}
            type="text"
            name="username"
            value={formData.username}
            placeholder="Username"
            onChange={handleChange}
          />
          {errors.username && <p className={style.error}>{errors.username}</p>}

          <input
            className={style.input}
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
          />
          {errors.email && <p className={style.error}>{errors.email}</p>}

          <input
            className={style.input}
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
          />
          {errors.password && <p className={style.error}>{errors.password}</p>}

          <button className={style.button} type="submit">Sign Up</button>
        </form>

        {error && <p className={style.error}>{error}</p>}

        <p className={style.register}>
          Already have an account?{' '}
          <a href="#" onClick={() => navigate('/log-in')}>Log In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
