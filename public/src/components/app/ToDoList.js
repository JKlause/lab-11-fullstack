import Component from '../Component.js';
import ToDoItem from './ToDoItem.js';

class ToDoList extends Component {

    onRender(list) {
        const toDos = this.props.todos;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;
        toDos.forEach(toDo => {
            const toDoItem = new ToDoItem({ toDo, onUpdate, onRemove });
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