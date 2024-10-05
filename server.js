const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv'); 
const db = require('./database');

dotenv.config(); 

// connection to the database 
const db = mysql.createConnection({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    // If no connection 
    if(err) return console.log("Error connecting to MYSQL");

    //If connect works successfully
    console.log("Connected to MYSQL as id: ", db.threadId); 
}) 

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');



// Question 1 goes here(Retrieve all patients)

app.get('/patients', (req,res) => {

  // Retrieve data from database 
  db.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients', (err, results) =>{
      if (err){
          console.error(err);
          res.status(500).send('Error Retrieving data')
      }else {
          //Display the records to the browser 
          res.render('data', {results: results});
      }
  });
});
// Question 2 goes here(Retrieve all providers)

app.get('/providers', (req,res) => {

  // Retrieve data from database 
  db.query('SELECT first_name, last_name, provider_specialty FROM providers', (err, results) =>{
      if (err){
          console.error(err);
          res.status(500).send('Error Retrieving data')
      }else {
          //Display the records to the browser 
          res.render('data', {results: results});
      }
  });
});
// Question 3 goes here(Filter by patients first name)

app.get('/patients/:firstName', (req,res) => {

  // Retrieve data from database 
  db.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?', (err, results) =>{
      if (err){
          console.error(err);
          res.status(500).send('Error Retrieving data')
      }else {
          //Display the records to the browser 
          res.render('data', {results: results});
      }
  });
});

// Question 4 goes here(Retrieve all providers by their speciality)

app.get('/providers/:specialty', (req,res) => {

  // Retrieve data from database 
  db.query('SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?', (err, results) =>{
      if (err){
          console.error(err);
          res.status(500).send('Error Retrieving data')
      }else {
          //Display the records to the browser 
          res.render('data', {results: results});
      }
  });
});

// Start the server 
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);

  // Sending a message to the browser 
  console.log('Sending message to browser...');
  app.get('/', (req,res) => {
      res.send('Server Started Successfully!');
  });

});
