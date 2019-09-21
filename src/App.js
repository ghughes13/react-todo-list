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
    listText[indexOfItemToEdit] = updatedText;
    setListText(
      [...listText]
    )
  };

  return (
    <div className="App">
      <div class="header">
        <h1>React To-Do App</h1>
      </div>
      <div className="list-container">
        <ListItems toDoItems={listText} deleteItem={deleteItem} editItem={editItem}/>
      </div>
      <div className="newToDoItem">
        <input type="text" className="addNewToDoItem" placeholder="Get Apples"/>
        <button onClick={() => {
          if(document.querySelector('.addNewToDoItem').value == '') {
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
