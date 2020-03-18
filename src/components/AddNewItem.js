import React from 'react';

export default function AddNewItem(props) {

  return (
      <div className="newToDoItem">
        <input type="text" className="addNewToDoItem" placeholder="Get Apples"/>
        <button onClick={() => {
          if(document.querySelector('.addNewToDoItem').value === '') {
            console.log('No items, adding new');
          } else {
            props.addNewItem(document.querySelector('.addNewToDoItem').value)
            document.querySelector('.addNewToDoItem').value = ''
          }
        }}>Add Item</button>
      </div>
  );
}
