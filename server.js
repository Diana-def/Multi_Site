const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

// Create an instance of Express
const app = express();

// Configure the MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3310,
  user: 'root',
  password: '0311',
  database: 'multi_site',
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Configure the middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
// теперь он знает, что мои файлы лежат в папке public
app.use(express.static(path.join(__dirname, 'public')));

// главная страница
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// переходит на login.html
// Define a route for the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/login_', (req, res) => {
  res.sendFile(path.join(__dirname, 'login_.html'));
});

// Define a route for the registration page
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

app.get('/register_', (req, res) => {
  res.sendFile(path.join(__dirname, 'register_.html'));
});

app.get('/register_exists', (req, res) => {
  res.sendFile(path.join(__dirname, 'register_exists.html'));
});

// Define a route to handle the login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Query the database for the user with the provided username and password
  connection.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) {
        console.error('Error executing the database query: ' + err.stack);
        return res.sendStatus(500);
      }

      if (results.length > 0) {
        res.sendFile(path.join(__dirname, 'public/login_.html'));
      } else {
        res.sendFile(path.join(__dirname, 'public/login_invalid.html'));
      }
    }
  );
});

// ввод данных из формы регистрации
app.post('/register', (req, res) => {
  const { name, last_name, email, username, password, telegram } = req.body;

  // Query the database to check if the username already exists
  connection.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
	(err, results) => {
	if (err) {
		console.error('Error executing the database query: ' + err.stack);
		return res.sendStatus(500);
	  }

	  if (results.length > 0) {
		res.sendFile(path.join(__dirname, 'public/register_exists.html'));
	  }

	  // Insert the new user into the database
	  connection.query(
		'INSERT INTO users (name, last_name, email, username, password, telegram) VALUES (?, ?, ?, ?, ?, ?)',
        [name, last_name, email, username, password, telegram],
		(err) => {
		  if (err) {
			console.error('Error executing the database query: ' + err.stack);
			return res.sendStatus(500);
		  }

		  res.sendFile(path.join(__dirname, 'public/register_.html'));
		}
	  );
	}
		 
  );
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});