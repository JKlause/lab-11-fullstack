const client = require('../lib/client');
const todos = require('./todo-data');

client.connect()
    .then(() => {
        return Promise.all(
            todos.map(todo => {
                return client.query(`
                INSERT INTO todos (task, completed)
                VALUES ($1, $2)
                RETURNING *;
            `,
                [todo.task, todo.completed])
                    .then(result => result.rows[0]);
            })
        );
    })
    .then(
        () => console.log('seed data load complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });