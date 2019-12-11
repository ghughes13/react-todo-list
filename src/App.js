import React, {useState} from 'react';
import './App.css';
import ListItems from './listitems';

function App() {

  if(window.localStorage.getItem('todo') == null) {
    console.log('it was empty');
    window.localStorage.setItem('todo', ['Fold Laundry', 'Do The Dishes', 'Workout', 'Vacuume']);
  }

  const [listText, setListText] = useState(window.localStorage.getItem('todo').split(','));

  const deleteItem = (itemToDelete) => {
    const indexOfItemToDel = listText.indexOf(itemToDelete);
    listText.splice(indexOfItemToDel,1);
    setListText(
      [...listText]
    )
  };

  const editItem = (itemToEdit, updatedText) => {
    if(updatedText === itemToEdit) {
      console.log('.indvListItem-' + itemToEdit.split(' ').join('-'))
      document.querySelector('.indvListItem-' + itemToEdit.split(' ').join('-')).style.display = 'initial';
      document.querySelector('.editBarFor-' + itemToEdit.split(' ').join('-')).style.display = 'none';
    }
    const indexOfItemToEdit = listText.indexOf(itemToEdit);
    console.log(indexOfItemToEdit, updatedText)
    listText[indexOfItemToEdit] = updatedText;
    setListText(
      [...listText]
    )
  };

  return (
    <div className="App">
      <div className="header">
        <h1>React To-Do App</h1>
      </div>
      <div className="list-container">
        <ListItems toDoItems={listText} deleteItem={deleteItem} editItem={editItem}/>
      </div>
      <div className="newToDoItem">
        <input type="text" className="addNewToDoItem" placeholder="Get Apples"/>
        <button onClick={() => {
          if(document.querySelector('.addNewToDoItem').value === '') {
            console.log('doing nothing');
          } else {
            setListText(listText => [...listText, document.querySelector('.addNewToDoItem').value])
          }
        }}>Add Item</button>
      </div>
    </div>
  );
}

export default App;
