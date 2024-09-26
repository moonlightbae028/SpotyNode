// app.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/routes'); // Import the routes

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // Use EJS as the template engine
app.use(express.static('public')); // Serve static files from the public folder

// Use the routes defined in routes.js
app.use('/', routes);

// Start the server
app.listen(3002, () => {
    console.log('Server is running on http://localhost:3002');
});
