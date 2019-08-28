// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// Database Client
const client = require('./lib/client');

//Auth
const ensureAuth = require('./lib/auth/ensure-auth');
const createAuthRoutes = require('./lib/auth/create-auth-routes');
const authRoutes = createAuthRoutes({
    selectUser(email) {
        return client.query(`
            SELECT id, email, hash, display_name as "displayName"
            FROM users
            WHERE email = $1;
        `,
        [email]
        ).then(result => result.rows[0]);
    },
    insertUser(user, hash) {
        return client.query(`
            INSERT into users (email, hash, display_name)
            VALUES ($1, $2, $3)
            RETURNING id, email, display_name as "displayName";
        `,
        [user.email, hash, user.displayName]
        ).then(result => result.rows[0]);
    }
});

// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // enable serving files from public
app.use(express.json()); // enable reading incoming json data

//setup authentication routes
app.use('/api/auth', authRoutes);

app.use('/api', ensureAuth);

app.get('/api/todos', (req, res) => {
    client.query(`
        SELECT
             id,
             task,
             completed
        FROM todos
        WHERE user_id = $1;
    `,
    [req.userId]
    )
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
        INSERT INTO todos (task, completed, user_id)
        VALUES ($1, $2, $3)
        RETURNING *;
    `,
    [todo.task, false, req.userId]
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
    const id = req.params.id;

    const todo = req.body;

    client.query(`
        UPDATE todos
        SET    task = $2,
               completed = $3
        WHERE  id = $1
        AND    user_id = $4
        RETURNING *;
    `,
    [id, todo.task, todo.completed, req.userId]
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
        AND    user_id = $2
        RETURNING *;
    `,
    [id, req.userId]
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

app.get('/api/test', (req, res) => {
    res.json({
        message: `the user's id is ${req.userId}`
    });
});

// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});