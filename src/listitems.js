import React, { useState, useEffect } from 'react';
import './App.css';

function ListItem(newProps) {

    const [props, setProps] = useState(newProps);


    useEffect(() => {
        setProps(newProps)
    }, [newProps]);
    
    let listItems = props.toDoItems.map((item, index) => 
        <li key={item.title + '-' + index}>
            <div className={"indv-item item-" + index} >
                <span className={"indvListItem-" + item._id}>{item.title}</span>
                <div className={"editBar editBarFor-" + item._id}>
                    <input type="text" className={'editInput editValueFor-' + item._id} defaultValue={item.title}></input>
                    <button 
                        className="submitEdit" 
                        onClick={() => props.editItem(item._id, document.querySelector('.editValueFor-' + item._id).value)}>Add
                    </button>
                </div>
            </div>
            <div className="itemBtns">
            <button className="btn editBtn" onClick={() => { 
                document.querySelector('.indvListItem-' + item._id).style.display = 'none';
                document.querySelector('.editBarFor-' + item._id).style.display = 'initial';
            }}>Edit</button>
            <button 
                className={"btn deleteItem item-" + index} 
                onClick={() => props.deleteItem(item.title)}>X
            </button>
            </div>
        </li>
    );
    
    return(
        <ul className="list-item">
            {listItems}
        </ul>
    );
}

export default ListItem;