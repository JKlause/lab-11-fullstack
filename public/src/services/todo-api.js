const URL = './api';

export function getToDos() {
    const url = `${URL}/todos`;
    return fetch(url)
        .then(response => {
            return response.json();
        });
}

export function addToDo(todo) {
    const url = `${URL}/todos`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo)
    });
}

export function updateToDo(todo) {
    const url = `${URL}/todos/${todo.id}`;
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo)
    });
} 

export function removeType(id) {
    const url = `${URL}/todos/${id}`;
    return fetch(url, {
        method: 'DELETE'
    });
}