const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');

const port = process.env.PORT || 5000;

const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// main routes
app.use('/api/goals', require('./routes/goalRoutes'));

app.listen(port, (err) => {
  if (err) throw err;
  console.log('Server listening on port'.yellow, port.blue);
});
