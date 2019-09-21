import React, {useState} from 'react';
import './App.css';
import ListItems from './listitems';

function App() {

  const [listText, setListText] = useState(['Laundry', 'Dishes']);

  const deleteItem = (itemToDelete) => {
    const indexOfItemToDel = listText.indexOf(itemToDelete);
    listText.splice(indexOfItemToDel,1);
    setListText(
      [...listText]
    )
  };

  const editItem = (itemToEdit, updatedText) => {
    const indexOfItemToEdit = listText.indexOf(itemToEdit);
    console.log(itemToEdit, updatedText);
    listText[indexOfItemToEdit] = updatedText;
    setListText(
      [...listText]
    )
  };

  return (
    <div className="App">
      <h1>React To-Do App</h1>
      <div className="list-container">
        <ListItems toDoItems={listText} deleteItem={deleteItem} editItem={editItem}/>
      </div>
      <div className="newToDoItem">
        <input type="text" className="addNewToDoItem"/>
        <button onClick={() => setListText(listText => [...listText, document.querySelector('.addNewToDoItem').value]) }>+</button>
      </div>
    </div>
  );
}

export default App;
