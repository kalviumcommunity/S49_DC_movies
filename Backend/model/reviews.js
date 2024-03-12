const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  "Movie_Name": String,
  "Feedback": String,
  "Rating": String
});

const ReviewModel = mongoose.model("review", ReviewSchema);

module.exports = ReviewModel;