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

        console.log(this.state.props.data[0].title) 
        listItems = this.state.props.data.map((item, index) => 
            <li key={item.title + '-' + index}>
                <div className={"indv-item item-" + index} >
                    <span className={"indvListItem-" + item.title.split(' ').join('-')}>{item.title}</span>
                    <div className={"editBar editBarFor-" + item.title.split(' ').join('-')}>
                        <input type="text" className={'editInput editValueFor-' + item.title.split(' ').join('-')} defaultValue={item.title}></input>
                        <button 
                            className="submitEdit" 
                            onClick={() => this.props.editItem(item.title, document.querySelector('.editValueFor-' + item.title.split(' ').join('-')).value)}>Add
                        </button>
                    </div>
                </div>
                <div className="itemBtns">
                <button className="btn editBtn" onClick={() => { 
                    document.querySelector('.indvListItem-' + item.title.split(' ').join('-')).style.display = 'none';
                    document.querySelector('.editBarFor-' + item.title.split(' ').join('-')).style.display = 'initial';
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