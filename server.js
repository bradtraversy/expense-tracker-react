const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const transactions = require('./routes/transactions');

const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

app.use('/api/v1/transactions', transactions); // whenever we make a request to api/v1/transcations, it will be routed to router.get('/', (req, res) => res.send('hello')) in router.transactions.js
// app.get('/', (req, res) => res.send('hello'));
const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

