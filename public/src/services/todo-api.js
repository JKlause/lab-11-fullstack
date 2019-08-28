const URL = './api';
import store from './store.js';

const token = store.getToken();
if(!token && location.pathname !== '/auth.html') {
    const searchParams = new URLSearchParams();
    searchParams.set('redirect', location.pathname);
    location = `auth.html?${searchParams.toString()}`;
}

function fetchWithError(url, options) {
    if(token) {
        options = options || {};
        options.headers = options.headers || {};
        options.headers.Authorization = token;
    }

    return fetch(url, options)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                return response.json().then(json => {
                    throw json.error;
                });
            }
        });
}

export function getToDos() {
    const url = `${URL}/todos`;
    return fetchWithError(url);
}

export function addToDo(todo) {
    const url = `${URL}/todos`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo)
    });
}

export function updateToDo(todo) {
    const url = `${URL}/todos/${todo.id}`;
    return fetchWithError(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo)
    });
} 

export function removeToDo(id) {
    const url = `${URL}/todos/${id}`;
    return fetchWithError(url, {
        method: 'DELETE'
    });
}

export function userSignUp(credentials) {
    const url = `${URL}/auth/signup`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    });
}

export function userSignIn(credentials) {
    const url = `${URL}/auth/signin`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    });
}