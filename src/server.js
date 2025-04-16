const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./src/database/contacts.db');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('welcome');
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', (req, res) => {
    const { firstName, lastName, streetAddress, city, zipCode, country } = req.body;
    db.run(
        'INSERT INTO contacts (firstName, lastName, streetAddress, city, zipCode, country) VALUES (?, ?, ?, ?, ?, ?)',
        [firstName, lastName, streetAddress, city, zipCode, country],
        (err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.redirect('/');
            }
        }
    );
});

app.get('/search', (req, res) => {
    res.render('search');
});

app.post('/search', (req, res) => {
    const { firstName, lastName, city, country } = req.body;
    let query = 'SELECT * FROM contacts WHERE 1=1';
    const params = [];

    if (firstName) {
        query += ' AND firstName LIKE ?';
        params.push(`%${firstName}%`);
    }
    if (lastName) {
        query += ' AND lastName LIKE ?';
        params.push(`%${lastName}%`);
    }
    if (city) {
        query += ' AND city LIKE ?';
        params.push(`%${city}%`);
    }
    if (country) {
        query += ' AND country LIKE ?';
        params.push(`%${country}%`);
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.render('search', { results: rows });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});