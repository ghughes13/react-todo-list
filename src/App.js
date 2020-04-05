import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { Router, navigate } from "@reach/router"

import ListItems from './components/DeleteableAndEditableItem';
import AddNewItem from './components/AddNewItem'
import Login from './components/Login';
import Header from './components/Header'
import Repeatable from './components/CompleteableItem'

import './styles/App.css';


function App() {

  const [listData, setListData] = useState([]);
  const [dailyToDoList, setDailyToDoList] = useState([]);
  // const [weeklyToDoList, setWeeklyToDoList] = useState([])

  const [isLoggedin, setIsLoggedin] = useState(false); //set to false for login screen display
  // const [thisUser, setThisUser] = useState();
  
  useEffect(() => {
    requestToDoList()
  }, []);



  const requestToDoList = async () => {
    await axios
      .get("https://api505.herokuapp.com/getToDoList") //localhost:9000.com
      .then(data => {
        setListData(data.data)
    })
      .catch(error => {
      console.error('error: ', error);
    });
  }
  
  const requestDailyToDo = async () => {
    await axios
      .get("https://api505.herokuapp.com/getDailyToDoList")
      .then(data => {
        console.log(data.data);
        data = data.data.filter((item, index) => {
          return item.complete === false
        })
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
      url: 'https://api505.herokuapp.com/delItem',
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
    axios.post('https://api505.herokuapp.com/addNew', {task: itemToAdd}) 
    .then(function (response) {
      if(response.status === 200) {
        requestToDoList();
      }
    }).then(requestToDoList).catch(function (error) {
      console.error(error);
    });
  }



  const validateLogin = (username, password) => {
    console.log('logging in');
    document.getElementById('login-error').classList.remove('animate');
    axios.post('https://api505.herokuapp.com/validateLogin', {username: username, password: password}) 
    .then(res => {
      console.log(res.data)
      setIsLoggedin(res.data)
      if(res.data === false) {
        document.getElementById('login-error').style.display = "block"
        document.getElementById('login-error').classList.add('animate');
      } else {
        // navigate(`/todo`)
      }
    })
  }



  const markComplete = (itemToComplete) => {
    console.log('marking');
    let id = getElementID(itemToComplete, dailyToDoList)
    axios({
      method: 'put',
      url: 'https://api505.herokuapp.com/updateDailyItem',
      data: {
        editThis: id,
      }
    })
    .then(res => {
      setDailyToDoList(res.data)
    })
  }


  
  if(!isLoggedin) {
    navigate(`/login`)
    return (
      <Router>
        <Login loginFunct={validateLogin} path="/login" /> 
      </Router>
    )
  } else {
    if(listData.length !== 0) {
        return (
          <div className="App">
            <Header requestDailyToDo={requestDailyToDo} />
            <div className="list-container">
            <Router>
              <ListItems toDoItems={listData} deleteItem={deleteItem} editItem={editItem}  path="/todo" /> 
              <Repeatable toDoItems={dailyToDoList} markComplete={markComplete}  path="/daily" /> 
            </Router>
            </div>
            <Router>
              <AddNewItem addNewItem={addNewItem} path="/todo" /> 
            </Router>
          </div>
        );
    } else {
      return <h1>Loading...</h1>
    }
  }
}

export default App;
