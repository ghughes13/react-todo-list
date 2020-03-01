import React, {useState, useEffect } from 'react';
import './App.css';
import ListItems from './listitems';
import axios from 'axios';


function App() {

  const [listData, setListData] = useState([])

  useEffect(() => {
    requestToDoList()
  }, []);

  const requestToDoList = async () => {
    await axios
      .get("https://api505.herokuapp.com/getData")
      .then(data => {
        setListData(data.data)
    })
      .catch(error => {
      console.error('error: ', error);
    });
  }

  const getElementID = (el) => { //GETS THE DB ID ASSOCIATED WITH AN ITEM 
      for(let i = 0; i < listData.length; i ++) {
        if(listData[i].title === el) {
          return listData[i]._id;
        } 
    }
  }

  const deleteItem = (itemToDelete) => { //
    axios({
      method: 'delete',
      url: 'https://api505.herokuapp.com/delItem',
      data: {
        delThis: getElementID(itemToDelete)
      }
    })
    .then(res => {
      setListData(res.data)
    })
  };

  const editItem = (itemToEdit, updatedText) => {
    if(updatedText === itemToEdit) {
      document.querySelector('.indvListItem-' + itemToEdit).style.display = 'initial';
      document.querySelector('.editBarFor-' + itemToEdit).style.display = 'none';
    }

    axios({
      method: 'put',
      url: 'https://api505.herokuapp.com/updateItem',
      data: {
        editThis: itemToEdit,
        newText: updatedText
      }
    })
    .then(res => {
      setListData(res.data)
    })
    
    document.querySelector('.indvListItem-' + itemToEdit).style.display = 'initial';
    document.querySelector('.editBarFor-' + itemToEdit).style.display = 'none';
  };

  const addNewItem = (itemToAdd) => {
    axios.post('https://api505.herokuapp.com/addNew', {title: itemToAdd}) 
    .then(function (response) {
      if(response.status === 200) {
        requestToDoList();
      }
    }).then(requestToDoList).catch(function (error) {
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
