const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); 
dotenv.config();

const app = express();
const port = 3000;


const { connectToDB, disconnectFromDB, mongooseConnection } = require('./db');
const config = { mongoURI: process.env.MONGO_URI }; 


connectToDB(config);

app.get('/', (req, res) => {
  const connectionStatus = mongooseConnection.readyState;
  const message = connectionStatus === 1 ? 'Connected' : 'Not Connected';

  res.send(`Database Connection Status: ${message}`);
});
app.get('/ping', (req, res) => {
  res.send('pong');
});
if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}
module.exports = app;
