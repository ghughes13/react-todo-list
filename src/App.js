import React, {useState, useEffect } from 'react';
import axios from 'axios';

import ListItems from './components/ToDoListItem';
import AddNewItem from './components/AddNewItem'
import Login from './components/Login';
import Header from './components/Header'
import DailyListItem from './components/DailyToDoLi'

import './styles/App.css';


function App() {

  const [listData, setListData] = useState([]);
  const [dailyToDoList, setDailyToDoList] = useState([]);
  const [listToDisplay, setListToDisplay] = useState('todo');

  const [isLoggedin, setIsLoggedin] = useState(true); //set to false for login screen display
  const [thisUser, setThisUser] = useState();
  
  useEffect(() => {
    requestToDoList()
  }, []);

  const requestToDoList = async () => {
    await axios
      .get("http://localhost:9000/getToDoList") //localhost:9000.com
      .then(data => {
        setListData(data.data)
    })
      .catch(error => {
      console.error('error: ', error);
    });
  }
  
  const requestDailyToDo = async () => {
    await axios
      .get("http://localhost:9000/getDailyToDoList") //localhost:9000.com
      .then(data => {
        console.log(data.data);
        data = data.data.filter((item, index) => {
          return item.complete === false
        })
        console.log('======')
        console.log(data);
        console.log('======')
        setDailyToDoList(data)
    })
      .catch(error => {
      console.error('error: ', error);
    });
  }

  const getElementID = (el, whatListToCheck, ) => { //GETS THE DB ID ASSOCIATED WITH AN ITEM 
      for(let i = 0; i < whatListToCheck.length; i ++) {
        if(whatListToCheck[i].task === el) {
          return whatListToCheck[i]._id;
        } 
    }
  }

  const deleteItem = (itemToDelete) => { //
    axios({
      method: 'delete',
      url: 'http://localhost:9000/delItem',
      data: {
        delThis: getElementID(itemToDelete, listData)
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
      url: 'http://localhost:9000/updateItem',
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
    axios.post('http://localhost:9000/addNew', {task: itemToAdd}) 
    .then(function (response) {
      if(response.status === 200) {
        requestToDoList();
      }
    }).then(requestToDoList).catch(function (error) {
      console.error(error);
    });
  }

  const validateLogin = (username, password) => {
    axios.post('http://localhost:9000/validateLogin', {username: username, password: password}) 
    //Sending Username and password
    //Server will reply with whether use is auth'd or not. 
    .then(res => {
      //If user is authed. Request that users list. 
    })
  }

  const displayThisList = () => {
    setListToDisplay('daily')
  }

  const displayOtherList = () => {
    setListToDisplay('todo')
  }

  const markComplete = (itemToComplete) => {
    console.log('marking');
    let id = getElementID(itemToComplete, dailyToDoList)
    axios({
      method: 'put',
      url: 'http://localhost:9000/updateDailyItem',
      data: {
        editThis: id,
      }
    })
    .then(res => {
      setDailyToDoList(res.data)
    })
  }

  if(!isLoggedin) {
    return (
      <Login loginFunct={validateLogin}/>
    )
  } else {
    if(listData.length !== 0) {
      if(listToDisplay === 'todo') {
        return (
          <div className="App">
            <Header requestDailyToDo={requestDailyToDo} displayThisList={displayThisList} />
            <div className="list-container">
              <ListItems toDoItems={listData} deleteItem={deleteItem} editItem={editItem}/>
            </div>
            <AddNewItem addNewItem={addNewItem} />
          </div>
        );
      } else if (listToDisplay === 'daily') {
        return (
          <div className="App">
            <Header requestDailyToDo={requestDailyToDo} displayThisList={displayOtherList} />
            <div className="list-container">
              <DailyListItem toDoItems={dailyToDoList} markComplete={markComplete} />
            </div>
          </div>
        );
      }
    } else {
      return <h1>Loading...</h1>
    }
  }
}

export default App;
