import React from 'react';
import './App.css';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0, 
            hasrun : 0
        };
    }

    render() {
        // console.log(this.props.toDoItems());
        // console.log('length -> ' + this.props.toDoItems())
        // console.log('mapped -> ' + this.props.toDoItems().map((item, index) => item.split(' ').join('-')));
        // console.log("===============================")
        const listItems = this.props.toDoItems.map((item, index) => 
            <li key={item + '-' + index}>
                <div className={"indv-item item-" + index} >
                    <span className={"indvListItem-" + item.split(' ').join('-')}>{item}</span>
                    <div className={"editBar editBarFor-" + item.split(' ').join('-')}>
                        <input type="text" className={'editInput editValueFor-' + item.split(' ').join('-')} defaultValue={item}></input>
                        <button 
                            className="submitEdit" 
                            onClick={() => this.props.editItem(item, document.querySelector('.editValueFor-' + item.split(' ').join('-')).value)}>Add
                        </button>
                    </div>
                </div>
                <div className="itemBtns">
                <button className="btn editBtn" onClick={() => { 
                    document.querySelector('.indvListItem-' + item.split(' ').join('-')).style.display = 'none';
                    document.querySelector('.editBarFor-' + item.split(' ').join('-')).style.display = 'initial';
                }}>Edit</button>
                <button 
                    className={"btn deleteItem item-" + index} 
                    onClick={() => this.props.deleteItem(item)}>X
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
}

export default ListItem;