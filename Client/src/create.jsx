import React, { useState } from 'react';
import axios from 'axios';
import "./create.css";
import { Link } from 'react-router-dom';

export default function Create() {
  const [field, setField] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if any of the fields are empty
    if (!field.firstName || !field.lastName || !field.email) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await axios.post('http://localhost:3000/reviews', {
        Movie_Name: field.firstName,
        Feedback: field.email,
        Rating: field.lastName,
      });
      // Handle success or redirect as needed
      console.log('Review submitted successfully!');
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error adding review:', error);
      // Handle error
      alert('Error adding review. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>

        <h1>Review</h1>
        <input
          id="first-name"
          className="form-field"
          type="text"
          placeholder="Movie name"
          name="firstName"
          value={field.firstName}
          onChange={(e) => { setField({ ...field, firstName: e.target.value }) }}
        />

        <input
          id="last-name"
          className="form-field"
          type="text"
          placeholder="Rating"
          name="lastName"
          value={field.lastName}
          onChange={(e) => { setField({ ...field, lastName: e.target.value }) }}
        />

        <input
          id="email"
          className="form-field"
          type="text"
          placeholder="Feedback"
          name="email"
          value={field.email}
          onChange={(e) => { setField({ ...field, email: e.target.value }) }}
        />

        <button className="form-field" type="submit">
          Add Review
        </button>
      </form>
      <div>
        <Link to="/"><button id='goback'>Go back</button></Link>
      </div>
    </div>
  );
}
