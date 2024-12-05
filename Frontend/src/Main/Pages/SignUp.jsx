import React, { useState } from 'react';
import style from '../PagesCSS/LogInSignUp.module.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const [error, setError] = useState('');  // State for handling error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/sign-up', {  // Make sure this endpoint is correct
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
        navigate('/');  // Navigate to home page after successful sign-up
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
        <form onSubmit={handleSubmit}>
          <input
            className={style.input}
            type="text"
            name="username"
            value={formData.username}
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            className={style.input}
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className={style.input}
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            minLength="8"
            onChange={handleChange}
            required
          />
          <button className={style.button} type="submit">Sign Up</button>
        </form>
        
        {/* Error message will display here if it exists */}
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
