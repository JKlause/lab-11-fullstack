import Component from '../Component.js';

class ToDoItem extends Component {

    onRender(dom) {
        const todo = this.props.todo;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        const completedButton = dom.querySelector('.completed-button');
        completedButton.addEventListener('click', () => {
            todo.completed = !todo.completed;
            onUpdate(todo);
        });

        const removeButton = dom.querySelector('.remove-button');
        removeButton.addEventListener('click', () => {
            if(confirm(`Are you sure you want to remove "${todo.task}"?`)) {
                onRemove(todo);
            }
        });
    }
    
    renderHTML() {

        const toDo = this.props.todo;
        
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