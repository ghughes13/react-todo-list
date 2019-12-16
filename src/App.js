import React, {useState} from 'react';
import './App.css';
import ListItems from './listitems';

function App() {

  if(window.localStorage.getItem('todo') == null) { //Check if localdata is set for 'todo'
    window.localStorage.setItem('todo', ['Fold Laundry', 'Do The Dishes', 'Workout', 'Vacuume']);
  }

  const [listText, setListText] = useState(window.localStorage.getItem('todo').split(','));

  const getLocalData = () => { //Returns an array of the todo list items
    return window.localStorage.getItem('todo').split(',');
  }

  const deleteItem = (itemToDelete) => {
    let localToDo = getLocalData() 
    const indexOfItemToDel = localToDo.indexOf(itemToDelete); 
    localToDo.splice(indexOfItemToDel,1); //Remove Item
    window.localStorage.setItem('todo', localToDo)
    setListText(
      window.localStorage.getItem('todo').split(',')
    )
  };

  const editItem = (itemToEdit, updatedText) => {
    let localToDo = getLocalData();
    if(updatedText === itemToEdit) {
      document.querySelector('.indvListItem-' + itemToEdit.split(' ').join('-')).style.display = 'initial';
      document.querySelector('.editBarFor-' + itemToEdit.split(' ').join('-')).style.display = 'none';
    }
    const indexOfItemToEdit = localToDo.indexOf(itemToEdit);
    localToDo[indexOfItemToEdit] = updatedText;
    window.localStorage.setItem('todo', localToDo)
    setListText(
      window.localStorage.getItem('todo').split(',')
    )
  };

  return (
    <div className="App">
      <div className="header">
        <h1>React To-Do App</h1>
      </div>
      <div className="list-container">
        <ListItems toDoItems={getLocalData} deleteItem={deleteItem} editItem={editItem}/>
      </div>
      <div className="newToDoItem">
        <input type="text" className="addNewToDoItem" placeholder="Get Apples"/>
        <button onClick={() => {
          if(document.querySelector('.addNewToDoItem').value === '') {
            // console.log('doing nothing');
          } else {
            // console.log(window.localStorage.getItem('todo').split(',').concat([(document.querySelector('.addNewToDoItem').value)]))
            setListText()
          }
        }}>Add Item</button>
      </div>
    </div>
  );
}

export default App;
