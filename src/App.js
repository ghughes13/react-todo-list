import React, {useState} from 'react';
import './App.css';
import ListItems from './listitems';

function App() {

  const [listText, setListText] = useState(['Laundry', 'Dishes']);

  return (
    <div className="App">
      <h1>React To-Do App</h1>
      <div class="list-container">
        <ListItems toDoItems={listText}/>
      </div>
      <div class="newToDoItem">
        <input type="text" className="addNewToDoItem"/>
        <button onClick={() => setListText(listText => [...listText, document.querySelector('addNewToDoItem').value]) }>+</button>
      </div>
    </div>
  );
}

export default App;
