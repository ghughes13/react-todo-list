import React, { useState, useEffect } from 'react';

export default function ListItem(newProps) {

    const [props, setProps] = useState(newProps);

    useEffect(() => {
        setProps(newProps)
    }, [newProps]);

    
    const checkIfKeyIsEnter = (e, itemID) => {
        if (e.key === 'Enter') {
            addEdit(itemID);                                  
        }
    }

    const addEdit = (itemID) => {
        props.editItem(itemID, document.querySelector('.editValueFor-' + itemID).value)
    }
    
    let listItems = props.toDoItems.map((item, index) => 
        <li key={item.task + '-' + index}>
            <div className={"indv-item item-" + index} >
                <span className={"indvListItem-" + item._id}>{item.task}</span>
                <div className={"editBar editBarFor-" + item._id}>
                    <input 
                        type="text" 
                        className={'editInput editValueFor-' + item._id} 
                        defaultValue={item.task} 
                        onKeyPress={(e) => checkIfKeyIsEnter(e, item._id)}>
                    </input>
                    <button 
                        className="submitEdit" 
                        onClick={() => addEdit(item._id)}>Add
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
                onClick={() => props.deleteItem(item.task)}>X
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
