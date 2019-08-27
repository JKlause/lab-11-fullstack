const URL = './api';

export function getToDos() {
    const url = `${URL}/todos`;
    return fetch(url)
        .then(response => {
            return response.json();
        });
}