import React from 'react'
import '../PagesCSS/LogInSignIn.css';
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <h1 className="title">Sign Up</h1>
        <form>
          <input type="text" placeholder="username" required />
          <input type="password" placeholder="password" required />
          <button type="submit">Sign Up</button>
        </form>
      <p className="register">
        Have an account? <a href="#" onClick={() => navigate('/log-in')}>Log In</a>
      </p>
    </div>
  )
}

export default SignIn