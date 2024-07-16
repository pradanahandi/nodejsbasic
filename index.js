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

// Create connection
require('dotenv/config')
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Connect to database and create database/tables if they don't exist
conn.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected...');
  
  const createDatabase = `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\`;`;
  conn.query(createDatabase, (err, result) => {
    if (err) throw err;
    console.log('Database ensured...');

    const useDatabase = `USE \`${process.env.DB_DATABASE}\`;`;
    conn.query(useDatabase, (err, result) => {
      if (err) throw err;

      const createTable = `
        CREATE TABLE IF NOT EXISTS product (
          product_id INT AUTO_INCREMENT PRIMARY KEY,
          product_name VARCHAR(200),
          product_price INT
        ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
      `;
      conn.query(createTable, (err, result) => {
        if (err) throw err;
        console.log('Table ensured...');
      });
    });
  });
});

// Set views file
app.set('views', path.join(__dirname, 'views'));
// Set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Set folder public as static folder for static file
app.use('/assets', express.static(__dirname + '/public'));
var ip = require("ip");

// Route for homepage
app.get('/', (req, res) => {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.render('product_view', {
      results: results,
      hostIp: ip.address()
    });
  });
});

// Route for insert data
app.post('/save', (req, res) => {
  let data = { product_name: req.body.product_name, product_price: req.body.product_price };
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Route for update data
app.post('/update', (req, res) => {
  let sql = "UPDATE product SET product_name='" + req.body.product_name + "', product_price='" + req.body.product_price + "' WHERE product_id=" + req.body.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Route for delete data
app.post('/delete', (req, res) => {
  let sql = "DELETE FROM product WHERE product_id=" + req.body.product_id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.get("/ip", function (req, res) {
  console.log(req.socket.remoteAddress);
  console.log(req.ip);
  res.send("your IP is: " + req.ip);
});

// Server listening
app.listen(8000, () => {
  console.log('Server is running at port 8000');
  console.log('Your IP is', ip.address());
});
