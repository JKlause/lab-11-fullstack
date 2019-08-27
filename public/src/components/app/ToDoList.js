import Component from '../Component.js';
import ToDoItem from './ToDoItem.js';

class ToDoList extends Component {

    onRender(list) {
        const todos = this.props.todos;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;
        todos.forEach(todo => {
            console.log(todo);
            const toDoItem = new ToDoItem({ todo, onUpdate, onRemove });
            list.appendChild(toDoItem.renderDOM());
        });
    }
    renderHTML() {
        return /*html*/`
            <ul class="todo-list"></ul>
        `;
    }
}

export default ToDoList;