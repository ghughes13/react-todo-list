import React, {useState, useEffect } from 'react';
import './App.css';
import ListItems from './listitems';
import axios from 'axios';


function App() {

  const [listText, setListText] = useState(['Fold Laundry', 'Do The Dishes', 'Workout', 'Vacuume']);
  const [listData, setlistData] = useState([])

  useEffect(() => {
    //Request data from server to populate the todolist
    try {
      axios
      .get("http://localhost:9000/getData")
      .then(data => setlistData(data))
      // .then(data => console.log(data))
    } catch(error) {
      console.log('error: ', error);
    }
  }, []);

  console.log('list Data: ', listData);

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

  const addNewItem = (itemToAdd) => {
    console.log(itemToAdd)

    var body = {
      title: itemToAdd
    };


    axios.post('http://localhost:9000/addNew', body)
    .then(function (response) {
        console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }

  if(listData.length !== 0) {
    console.log('got data')
    console.log(listData)
    return (
      <div className="App">
        <div className="header">
          <h1>React To-Do App</h1>
        </div>
        <div className="list-container">
          <ListItems toDoItems={listData} deleteItem={deleteItem} editItem={editItem}/>
        </div>
        <div className="newToDoItem">
          <input type="text" className="addNewToDoItem" placeholder="Get Apples"/>
          <button onClick={() => {
            if(document.querySelector('.addNewToDoItem').value === '') {
              console.log('doing nothing');
            } else {
              addNewItem(document.querySelector('.addNewToDoItem').value)
            }
          }}>Add Item</button>
        </div>
      </div>
    );
  } else {
    return <h1>Loading...</h1>
  }
}

export default App;
