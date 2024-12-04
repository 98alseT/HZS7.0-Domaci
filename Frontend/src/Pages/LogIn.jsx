import React from 'react'
import '../PagesCSS/LogInSignIn.css';
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <h1 className="title">Log In</h1>
        <form>
          <input type="text" placeholder="username" required />
          <input type="password" placeholder="password" required />
          <button type="submit">LOGIN</button>
        </form>
      <p className="register">
        Not registered? <a href="#" onClick={() => navigate('/sign-in')}>Create an account</a>
      </p>
    </div>
  )
}

export default SignIn