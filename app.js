//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();

// Load environment variables from .env file
require('dotenv/config');

// Create Connection
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE
});

// Connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

// Check if the database exists, if not create it
const createDatabase = () => {
  conn.query("CREATE DATABASE IF NOT EXISTS " + process.env.DB_DATABASE, (err, result) => {
    if (err) throw err;
    console.log("Database created or already exists");
    createTable(); // Once the database is created, proceed to create the table
  });
};

// Check if the table exists, if not create it
const createTable = () => {
  conn.query("CREATE TABLE IF NOT EXISTS product (product_id INT AUTO_INCREMENT PRIMARY KEY, product_name VARCHAR(200), product_price INT(11))", (err, result) => {
    if (err) throw err;
    console.log("Table 'product' created or already exists");
  });
};

// Call function to create database and table
createDatabase();

// Set views file
app.set('views', path.join(__dirname, 'views'));
// Set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Set folder public as static folder for static file
app.use('/assets', express.static(__dirname + '/public'));
const ip = require("ip");
// Route for homepage
app.get('/', (req, res) => {
  const sql = "SELECT * FROM product";
  const query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('product_view',{
      results: results,
      hostIp: ip.address()
    });
  });
});

// Route for insert data
app.post('/save', (req, res) => {
  const data = {product_name: req.body.product_name, product_price: req.body.product_price};
  const sql = "INSERT INTO product SET ?";
  const query = conn.query(sql, data, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

// Route for update data
app.post('/update', (req, res) => {
  const sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.body.id;
  const query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

// Route for delete data
app.post('/delete', (req, res) => {
  const sql = "DELETE FROM product WHERE product_id="+req.body.product_id+"";
  const query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

// Route to get IP address
app.get("/ip", (req, res) => {
  console.log(req.socket.remoteAddress);
  console.log(req.ip);
  res.send("Your IP is: " + req.ip);
});

// Server listening
app.listen(8000, () => {
  console.log('Server is running at port 8000');
  console.log('Your IP is');
});
