import React, {useState, useEffect } from 'react';
import './App.css';
import ListItems from './listitems';
import axios from 'axios';


function App() {

  const [listText, setListText] = useState(['Fold Laundry', 'Do The Dishes', 'Workout', 'Vacuume']);
  const [listData, setlistData] = useState([])

  useEffect(() => {
    try {
    axios
    .get("http://localhost:9000/getData")
    .then(data => setlistData(data));
    } catch(error) {
      console.log('error: ', error);
    }

    
    axios.post(`http://localhost:9000/logData`, 'testing')
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
  }, []);

  console.log(listData)

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
