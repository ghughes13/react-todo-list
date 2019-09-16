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
        const listItems = this.props.toDoItems.map((item) => 
            <li><div class="indv-item">{item}</div></li>
        );
    
        return(
            <ul className="list-item">
                {listItems}
            </ul>
        );
    }
}

export default ListItem;