import Component from '../Component.js';
import ToDoItem from './ToDoItem.js';
import toDoData from '../../../assests/todo-data.js';

class ToDoList extends Component {

    onRender(list) {
        toDoData.forEach(toDo => {
            const toDoItem = new ToDoItem({ toDo });
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