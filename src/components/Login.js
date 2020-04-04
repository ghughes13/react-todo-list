import React, { useState } from 'react';
import '../styles/login.css'

export default function Login(newProps) {

  const [props ] = useState(newProps);
  console.log(props);
  
  return (
    <div className="login-component login">
      <form className="credentials" onSubmit={(e) => e.preventDefault()}>
        <h2>To-Do List</h2>
        <div id="login-error">
          <p>Error: Incorrect username or password</p>
        </div>
        {/* <label htmlFor="username">Username</label> */}
        <input type="text" name="username" id="username" placeholder="Username"/>
        {/* <label htmlFor="password">Password</label> */}
        <input type="password" name="password" id="password" placeholder="Password"/>
        <button type="submit" onClick={() => props.loginFunct(document.getElementById('username').value, document.getElementById('password').value )}>Login</button>
      </form>
    </div>
  )
}