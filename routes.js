// routes.js
const express = require('express');
const router = express.Router();
const { MongoClient, ObjectID } = require('mongodb');

// MongoDB connection URL
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Create
router.post('/create', async (req, res) => {
  try {
    await client.connect();
    console.log('Connected to the database');

    // Assuming req.body contains the data you want to insert

    res.status(201).json({ "success": "data created", "insertedId": result.insertedId });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ "error": "Internal Server Error" });
  }
});

// Read
router.get('/read', async (req, res) => {
  try {
    await client.connect();
    console.log('Connected to the database');

    // Assuming you want to fetch all documents in the collection


    res.status(200).json({ "success": "data read", "data": data });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ "error": "Internal Server Error" });
  }
});

// Update
router.put('/update/:id', async (req, res) => {
  try {
    await client.connect();
    console.log('Connected to the database');

    const objectId = new ObjectID(req.params.id);

    // Assuming req.body contains the updated data


    res.status(200).json({ "success": "data updated", "modifiedCount": result.modifiedCount });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ "error": "Internal Server Error" });
  }
});

// Delete
router.delete('/delete/:id', async (req, res) => {
  try {
    await client.connect();
    console.log('Connected to the database');

    const objectId = new ObjectID(req.params.id);

    res.status(200).json({ "success": "data deleted", "deletedCount": result.deletedCount });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ "error": "Internal Server Error" });
  }
});

module.exports = router;
