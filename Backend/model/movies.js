const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  "Movie_Title": String,
  "Box_Office": String,
  "Rating": Number
});

const MovieModel = mongoose.model("movie", MovieSchema);

module.exports = MovieModel;
