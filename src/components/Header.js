import React from 'react';
import { Link } from '@reach/router'
import "../styles/header.css"

export default function Header(props) {

  const callRequestDailyToDoAndDisplayDaily = (theList) => {
      props.requestRepeatableList(theList.toLowerCase());
  }

  return (
    <div className="header">
    <Link to="/todo" className="todo-tab" onClick={(e) => callRequestDailyToDoAndDisplayDaily(e.target.id)}>
      <h1 id="todo">To-Do List</h1>
    </Link>
    <Link to="/repeatable" className="daily-tab" onClick={(e) => callRequestDailyToDoAndDisplayDaily(e.target.id)}>            
      <h2 id="daily">Daily</h2>
    </Link>
    <Link to="/repeatable" className="weekly-tab" onClick={(e) => callRequestDailyToDoAndDisplayDaily(e.target.id)}>            
      <h2 id="weekly">Weekly</h2>
    </Link>
    </div>
  );
}
