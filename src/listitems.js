import React from 'react';
import './App.css';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props.toDoItems 
        };
      }

    render() {

        let listItems;

        listItems = this.state.props.data.map((item, index) => 
            <li key={item.title + '-' + index}>
                <div className={"indv-item item-" + index} >
                    <span className={"indvListItem-" + item._id}>{item.title}</span>
                    <div className={"editBar editBarFor-" + item._id}>
                        <input type="text" className={'editInput editValueFor-' + item._id} defaultValue={item.title}></input>
                        <button 
                            className="submitEdit" 
                            onClick={() => this.props.editItem(item._id, document.querySelector('.editValueFor-' + item._id).value)}>Add
                        </button>
                    </div>
                </div>
                <div className="itemBtns">
                <button className="btn editBtn" onClick={() => { 
                    console.log('.indvListItem-' + item._id)
                    document.querySelector('.indvListItem-' + item._id).style.display = 'none';
                    document.querySelector('.editBarFor-' + item._id).style.display = 'initial';
                }}>Edit</button>
                <button 
                    className={"btn deleteItem item-" + index} 
                    onClick={() => this.props.deleteItem(item.title)}>X
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