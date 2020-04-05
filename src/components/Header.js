import React from 'react';
import "../styles/header.css"

export default function Header(props) {

  const callRequestDailyToDoAndDisplayDaily = (theList) => {
      props.requestDailyToDo();
  }

  return (
    <div className="header">
    <div className="todo-tab" onClick={(e) => callRequestDailyToDoAndDisplayDaily(e.target.id)}>
      <h1 id="todo">To-Do List</h1>
    </div>
    <div className="daily-tab" onClick={(e) => callRequestDailyToDoAndDisplayDaily(e.target.id)}>            
      <h2 id="daily">Daily List</h2>
    </div>
    </div>
  );
}
