import ToDoItem from '../src/components/app/ToDoItem.js';
const test = QUnit.test;

QUnit.module('To Do List');

test('rendering list from data', assert => {
    // arrange
    const todo = {
        task: 'Take Out Trash',
        completed: true
    };

    const expected = /*html*/`
        <li class="todo-item">
            <span class="completed">Take Out Trash</span>
            <div>
                <button class="completed-button">
                    Make Incomplete
                </button>
                <button class="remove-button">
                    🗑
                </button>
            </div>
        </li>
    `;
    
    // act
    const toDoItem = new ToDoItem({ todo });
    const html = toDoItem.renderHTML();

    
    // assert
    assert.htmlEqual(html, expected);
});