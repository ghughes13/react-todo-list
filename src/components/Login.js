import React, { useState, useEffect } from 'react';
import '../styles/login.css'

export default function Login(newProps) {

  const [props, setProps] = useState(newProps);
  console.log(props);
  
  return (
    <div className="login-component login">
      <form className="credentials" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" placeholder="Leave Blank for Guest account"/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" placeholder="Leave Blank for Guest account"/>
        <button type="submit" onClick={() => props.loginFunct(document.getElementById('username').value, document.getElementById('password').value )}>Login</button>
      </form>
    </div>
  )
}