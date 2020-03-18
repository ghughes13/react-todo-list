import React from 'react';

export default function Header(props) {

  console.log(props);

  const callRequestDailyToDoAndDisplayDaily = () => {
      props.requestDailyToDo();
      props.displayThisList() 
  }

  return (
    <div className="header">
    <div className="todo-tab">
      <h1 onClick={callRequestDailyToDoAndDisplayDaily}>To-Do List</h1>
    </div>
    <div className="daily-tab" onClick={callRequestDailyToDoAndDisplayDaily}>            
      <h2>Daily List</h2>
    </div>
    </div>
  );
}
