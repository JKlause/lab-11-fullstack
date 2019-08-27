// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const client = require('./lib/client');

// Database Client
client.connect();

// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // enable serving files from public
app.use(express.json()); // enable reading incoming json data

app.get('/api/todos', (req, res) => {
    client.query(`
        SELECT
             id,
             task,
             completed
        FROM todos
    `)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.post('/api/todos', (req, res) => {
    const todo = req.body;
    client.query(`
        INSERT INTO todos (task, completed)
        VALUES ($1, $2)
        RETURNING *;
    `,
    [todo.task, false]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        }); 
});

app.put('/api/todos/:id', (req, res) => {
    console.log(req);
    const id = req.params.id;
    console.log(id);
    const todo = req.body;

    client.query(`
        UPDATE todos
        SET    task = $2,
               completed = $3
        WHERE  id = $1
        RETURNING *;
    `,
    [id, todo.task, todo.completed]
    )
        .then(result => {
            console.log(result);
            res.json(result.rows[0]);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        }); 
});

app.delete('/api/todos/:id', (req, res) => {
    const id = req.params.id;

    client.query(`
        DELETE FROM todos
        WHERE  id = $1
        RETURNING *;
    `,
    [id]
    )
        .then(result => {
            console.log(result);
            res.json(result.rows[0]);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        }); 
});

// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});