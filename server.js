const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to db:', err.stack);
        return;
    }
    console.log('Successfully connected to db');

    // Retrieve all patients
    app.get('/patients', (req, res) => {
        db.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients', (err, results) => {
            if (err) {
                console.error('Error retrieving patients:', err);
                res.status(500).send('Error retrieving patients');
            } else {
                res.json(results);
            }
        });
    });

    // Retrieve all providers
    app.get('/providers', (req, res) => {
        db.query('SELECT first_name, last_name, provider_specialty FROM providers', (err, results) => {
            if (err) {
                console.error('Error retrieving providers:', err);
                res.status(500).send('Error retrieving providers');
            } else {
                res.json(results);
            }
        });
    });

    // Retrieve patients by first name
    app.get('/patients/:firstName', (req, res) => {
        const firstName = req.params.firstName;
        db.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?', [firstName], (err, results) => {
            if (err) {
                console.error('Error retrieving patients by first name:', err);
                res.status(500).send('Error retrieving patients');
            } else {
                res.json(results);
            }
        });
    });

    // Retrieve providers by specialty
    app.get('/providers/:specialty', (req, res) => {
        const specialty = req.params.specialty;
        db.query('SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?', [specialty], (err, results) => {
            if (err) {
                console.error('Error retrieving providers by specialty:', err);
                res.status(500).send('Error retrieving providers');
            } else {
                res.json(results);
            }
        });
    });

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});
