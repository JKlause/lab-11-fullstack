import Component from '../Component.js';

class ToDoForm extends Component {

    onRender(dom) {
        const onAdd = this.props.onAdd;
        const form = dom.querySelector('form');
        const input = dom.querySelector('input[name=todo]');
        const error = dom.querySelector('p.error');

        form.addEventListener('submit', event => {
            event.preventDefault();

            const toDoItem = {
                task: input.value,
            };

            error.textContent = '';

            onAdd(toDoItem)
                .then(() => {
                    form.reset();
                    document.activeElement.blur();
                })
                .catch(err => {
                    error.textContent = err;
                });
        });
    }

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