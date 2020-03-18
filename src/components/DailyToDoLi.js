import React, { useState, useEffect } from 'react';

export default function DailyListItem(newProps) {

    const [props, setProps] = useState(newProps);

    useEffect(() => {
        setProps(newProps)
    }, [newProps]);
    
    let listItems = props.toDoItems.map((item, index) => 
        <li key={item.task + '-' + index}>
            <div className={"indv-item item-" + index} >
                <span className={"indvListItem-" + item._id}>{item.task}</span>
                <div className={"editBar editBarFor-" + item._id}>
                    <input type="text" className={'editInput editValueFor-' + item._id} defaultValue={item.task}></input>
                    <button 
                        className="submitEdit" 
                        onClick={() => props.editItem(item._id, document.querySelector('.editValueFor-' + item._id).value)}>Add
                    </button>
                </div>
            </div>
            <div className="itemBtns">
            <button 
                className={"btn deleteItem item-" + index} 
                onClick={() => props.markComplete(item.task)}>X
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