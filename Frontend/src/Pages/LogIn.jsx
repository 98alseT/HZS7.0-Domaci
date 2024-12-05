import React from 'react';
import style from '../PagesCSS/LogInSignIn.module.css';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <body className={style['body']}>
      <div className={style['main-container']}>
        <h1 className={style.title}>Log In</h1>
        <form>
          <input className={style.input} type="text" placeholder="username" required />
          <input className={style.input} type="password" placeholder="password" required />
          <button className={style.button} type="submit">LOGIN</button>
        </form>
        <p className={style.register}>
          Not registered?{' '}
          <a href="#" onClick={() => navigate('/sign-in')}>
            Create an account
          </a>
        </p>
      </div>
    </body>
  );
};

export default SignIn;
