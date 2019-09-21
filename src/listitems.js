import React from 'react';
import './App.css';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0 
        };
      }
    
    render() {
        const listItems = this.props.toDoItems.map((item, index) => 
            <li key={item + '-' + index}>
                <div className={"indv-item item-" + index} >
                    <span className={"indvListItem-" + item}>{item}</span>
                    <div className={"editBar editBarFor-" + item}>
                        <input type="text" className={'editValueFor-' + item} defaultValue={item}></input>
                        <button className="submitEdit" onClick={() => this.props.editItem(item, document.querySelector('.editValueFor-' + item).value)}>Add</button>
                    </div>
                </div>
                <div className="itemBtns">
                <button className={"btn deleteItem item-" + index} onClick={() => this.props.deleteItem(item)}>X</button>
                <button className="btn editBtn" onClick={() => {
                    document.querySelector('.indvListItem-' + item).style.display = 'none';
                    document.querySelector('.editBarFor-' + item).style.display = 'initial';
                }}>Edit</button>
                </div>
            </li>
        );
    
        return(
            <ul className="list-item">
                {listItems}
            </ul>
        );
    }
}

export default ListItem;