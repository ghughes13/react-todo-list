import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router'
import "../styles/header.css"

export default function Header(props) {

  const [activeTab, setActiveTab] = useState('todo-tab')

  useEffect(() => {
    makeActiveTab(activeTab)
    window.scrollTo(0, 0)
  })

  const callRequestDailyToDoAndDisplayDaily = (theList) => {
      props.requestRepeatableList(theList.target.id.toLowerCase());
      if(theList.target.classList.contains('tab')) {
        setActiveTab(theList.target.classList[0])
      } else {
        setActiveTab(theList.target.parentElement.classList[0])
      }
      window.scrollTo(0, 0)
  }

  const makeActiveTab = () => {
    if(document.querySelector('.active')) {
      document.querySelector('.active').classList.remove('active')
    }
    document.querySelector('.' + activeTab).classList.add('active');
  }

  return (
    <div className="header">
      <Link to="/todo" className="todo-tab tab" onClick={(e) => callRequestDailyToDoAndDisplayDaily(e)}>
        <h1 id="todo">To-Do List</h1>
      </Link> 
      <Link to="/repeatable" className="daily-tab tab" onClick={(e) => callRequestDailyToDoAndDisplayDaily(e)}>            
        <h2 id="daily">Daily</h2>
      </Link>
      <Link to="/repeatable" className="weekly-tab tab" onClick={(e) => callRequestDailyToDoAndDisplayDaily(e)}>            
        <h2 id="weekly">Weekly</h2>
      </Link>
      <Link to="/repeatable" className="monthly-tab tab" onClick={(e) => callRequestDailyToDoAndDisplayDaily(e)}>            
        <h2 id="monthly">Monthly</h2>
      </Link>
    </div>
  );
}
