import Component from '../Component.js';
import Header from './Header.js';
import ToDoForm from './ToDoForm.js';
import ToDoList from './ToDoList.js';

class ToDoApp extends Component {
    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const main = dom.querySelector('main');
        const toDoForm = new ToDoForm();
        main.appendChild(toDoForm.renderDOM());

        const toDoList = new ToDoList();
        main.appendChild(toDoList.renderDOM());
    }

    renderHTML() {
        return /*html*/`
            <div class="container">
                <main>
                    
                </main>
            </div>
        `;
    }
}
export default ToDoApp;