import Component from '../Component.js';

class ToDoItem extends Component {
    
    renderHTML() {

        const toDo = this.props.toDo;

        return /*html*/`
        
        <li class="todo-item">
            <span class="${toDo.completed ? 'completed' : ''}">${toDo.task}</span>
            <div>
                <button class="completed-button">
                    Make ${toDo.completed ? 'Incomplete' : 'Complete'}
                </button>
                <button class="remove-button">
                    🗑
                </button>
            </div>
        </li>
        
    `;
    }
}

export default ToDoItem;