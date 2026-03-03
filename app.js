const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to Postgres
const client = new Client({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres123',
    database: process.env.DB_NAME || 'myappdb',
    port: 5432
});

client.connect()
    .then(() => console.log("Connected to Postgres!"))
    .catch(err => console.error("DB connection error:", err));

// Create table + default user
client.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE,
        password VARCHAR(50)
    );
    INSERT INTO users (username, password)
    VALUES ('admin', 'admin123')
    ON CONFLICT (username) DO NOTHING;
`);

// 🔹 Login Page (Frontend)
app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>Login</title>
            <style>
                body { font-family: Arial; background:#f4f4f4; text-align:center; }
                .box { margin:100px auto; width:300px; padding:20px; background:white; box-shadow:0 0 10px #ccc; }
                input { width:100%; padding:8px; margin:8px 0; }
                button { width:100%; padding:8px; background:#007bff; color:white; border:none; }
            </style>
        </head>
        <body>
            <div class="box">
                <h2>Login</h2>
                <form method="POST" action="/login">
                    <input name="username" placeholder="Username" required />
                    <input name="password" type="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
            </div>
        </body>
        </html>
    `);
});

// 🔹 Handle Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await client.query(
            'SELECT * FROM users WHERE username=$1 AND password=$2',
            [username, password]
        );

        if (result.rows.length > 0) {
            res.send(`<h2>Welcome ${username}, you are connected to the database!</h2>`);
        } else {
            res.send(`<h3>Invalid username or password</h3><a href="/">Try Again</a>`);
        }

    } catch (err) {
        res.status(500).send('Server error');
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
