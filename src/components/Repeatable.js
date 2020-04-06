import React, { useState, useEffect } from 'react';
import Loader from './Loader'
import '../styles/loader.css'

export default function Repeatable(newProps) {

    const [props, setProps] = useState(newProps);
    let listItems;

    useEffect(() => {
        setProps(newProps)
    }, [newProps]);
        
    if(props.repeatableListItems.length === 0) {
        listItems = <Loader />
    } else {
        listItems = props.repeatableListItems.map((item, index) => 
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
    }
    
    return(
        <ul className="list-item">
            {listItems}
        </ul>
    );
}