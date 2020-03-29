import React from 'react';

export default function AddNewItem(props) {

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addItem();                                  
    }
  }

  const addItem = () => {
    console.log('added');
    if(document.querySelector('.addNewToDoItem').value === '') {
      console.log('No items, adding new');
    } else {
      props.addNewItem(document.querySelector('.addNewToDoItem').value)
      document.querySelector('.addNewToDoItem').value = ''
    }
  }

  return (
      <div className="newToDoItem">
        <input type="text" className="addNewToDoItem" placeholder="Get Apples" onKeyPress={(e) => handleKeyDown(e)} />
        <button onClick={() => addItem()}>Add Item</button>
      </div>
  );
}
