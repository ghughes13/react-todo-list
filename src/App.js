import React, {useState, useEffect } from 'react';
import './App.css';
import ListItems from './listitems';
import axios from 'axios';


function App() {

  const [listText, setListText] = useState(['Fold Laundry', 'Do The Dishes', 'Workout', 'Vacuume']);
  const [listData, setlistData] = useState([])

  useEffect(() => {
    updateToDoList()
  }, []);

  const updateToDoList = () => {
    console.log('about to run axios but');
    try {
      axios
      .get("http://localhost:9000/getData")
      .then(data => setlistData(data))
    } catch(error) {
      console.error('error: ', error);
    }
  }

  const getElementID = (el) => { //GETS THE DB ID ASSOCIATED WITH AN ITEM 
      for(let i = 0; i < listData.data.length; i ++) {
        if(listData.data[i].title === el) {
          return listData.data[i]._id;
        } 
    }
  }

  const deleteItem = (itemToDelete) => {
    axios({
      method: 'delete',
      url: 'http://localhost:9000/delItem',
      data: {
        delThis: getElementID(itemToDelete)
      }
    });
  };

  const editItem = (itemToEdit, updatedText) => {
    if(updatedText === itemToEdit) {
      document.querySelector('.indvListItem-' + itemToEdit.split(' ').join('-')).style.display = 'initial';
      document.querySelector('.editBarFor-' + itemToEdit.split(' ').join('-')).style.display = 'none';
    }

    const indexOfItemToEdit = listText.indexOf(itemToEdit);
    listText[indexOfItemToEdit] = updatedText;
    setListText(
      [...listText]
    )
  };

  const addNewItem = (itemToAdd) => {
    axios.post('http://localhost:9000/addNew', {title: itemToAdd}) 
    .then(function (response) {

    }).then(updateToDoList).catch(function (error) {
      console.error(error);
    });
  }

  if(listData.length !== 0) {
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
              console.log('No items, adding new');
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
