const express = require('express');
const app = express();
const port = 3000;
app.use(express.json())
require("dotenv").config();
const cors = require('cors');
const mongoose = require('mongoose');
let MovieModel = require("./model/movies")

app.use(cors());
app.use(express.urlencoded({ extended: true }));
async function Connection(){
      await mongoose.connect(process.env.DATABASE_URI);
      console.log("Connected to DB")
}

app.get('/movies', async (req, res) => {
  try {
    const movies = await MovieModel.find();
    console.log('Retrieved movies:', movies);
    res.json(movies);
  } catch (err) {
    console.error('Error retrieving movies:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

Connection().then(()=>{

  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
})

module.exports = app;