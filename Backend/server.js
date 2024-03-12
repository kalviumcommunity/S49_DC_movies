const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
require("dotenv").config();
const cors = require('cors');
const Joi = require('joi');
const mongoose = require('mongoose');
const MovieModel = require("./model/movies");
const ReviewModel = require("./model/reviews");

app.use(cors());
app.use(express.urlencoded({ extended: true }));

async function Connection() {
  await mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to DB");
}

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(10).required(),
})

app.post("/signup", (req, res) => {
  const {error, value} = signupSchema.validate(req.body);

  if(error){
    console.log(error)
    return res.send("Invalid Request");
  }

  res.send("Successfully signed up!");
});


// Endpoint to get movies
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

// Endpoint to add a review
app.post('/reviews', async (req, res) => {
  try {
    const { Movie_Name, Feedback, Rating } = req.body;
    console.log('Received review data:', { Movie_Name, Feedback, Rating });
    const review = new ReviewModel({ Movie_Name, Feedback, Rating });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error('Error adding review:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to get all reviews
app.get('/allreviews', async (req, res) => {
  try {
    const reviews = await ReviewModel.find();
    console.log('Retrieved all reviews:', reviews);
    res.status(200).json(reviews);
  } catch (err) {
    console.error('Error retrieving reviews:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to update a review
// Add the following route for handling the update request
app.put('/updateReview/:id', async (req, res) => {
  console.log("review edited")
  try {
    const reviewId = req.params.id;
    const { Movie_Name, Feedback, Rating } = req.body;

    // Use findByIdAndUpdate to update the review and get the updated document
    const updatedReview = await ReviewModel.findByIdAndUpdate(reviewId, { Movie_Name, Feedback, Rating }, { new: true });

    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // console.log('Updated review:', updatedReview);
    res.status(200).json(updatedReview);
  } catch (err) {
    console.error('Error updating review:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete("/review/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    await ReviewModel.findByIdAndDelete(id);
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

Connection().then(() => {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
});

module.exports = app;
