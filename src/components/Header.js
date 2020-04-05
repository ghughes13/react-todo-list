import React from 'react';
import { Link } from '@reach/router'
import "../styles/header.css"

export default function Header(props) {

  const callRequestDailyToDoAndDisplayDaily = (theList) => {
      props.requestDailyToDo();
  }

  return (
    <div className="header">
    <Link to="/todo" className="todo-tab" onClick={(e) => callRequestDailyToDoAndDisplayDaily(e.target.id)}>
      <h1 id="todo">To-Do List</h1>
    </Link>
    <Link to="/daily" className="daily-tab" onClick={(e) => callRequestDailyToDoAndDisplayDaily(e.target.id)}>            
      <h2 id="daily">Daily List</h2>
    </Link>
    </div>
  );
}
