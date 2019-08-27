import Component from '../Component.js';

class ToDoForm extends Component {

    renderHTML() {
        return /*html*/`
                <section class="todo-form-section">
                    <form class="todo-form">
                        <input name="todo" required>
                        <button>Add</button>
                    </form>
                    <p class="error"></p>
                </section>
        `;
    }
}

export default ToDoForm;