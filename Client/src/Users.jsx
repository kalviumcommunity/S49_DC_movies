import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import './User.css';
import axios from 'axios';

function Users({ handleCloseUsers }) {
  const [reviews, setReviews] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedRating, setEditedRating] = useState('');
  const [editedFeedback, setEditedFeedback] = useState('');

  useEffect(() => {
    // Fetch reviews from the backend when the component mounts
    fetch('http://localhost:3000/allreviews') // Adjust the URL based on your backend setup
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedRating(reviews[index].Rating);
    setEditedFeedback(reviews[index].Feedback);
  };

  const handleUpdate = () => {
    const reviewToUpdate = reviews[editingIndex];

    // Check if editingIndex is valid and reviews array has the expected structure
    if (!reviewToUpdate || !reviewToUpdate._id) {
      console.error('Invalid review data for update');
      return;
    }

    const updateUrl = `http://localhost:3000/UpdateReview/${reviewToUpdate._id}`;

    fetch(updateUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Rating: editedRating,
        Feedback: editedFeedback
       
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(updatedReview => {
      const updatedReviews = [...reviews];
      updatedReviews[editingIndex] = updatedReview;
      setReviews(updatedReviews);
      setEditingIndex(null);
    })
    .catch(error => console.error('Error updating review:', error));
  };

  const handleDelete = (reviewId) => {
    console.log('Deleting review with ID:', reviewId);
  
    axios.delete(`http://localhost:3000/review/${reviewId}`)
      .then(() => {
        const updatedReviews = reviews.filter(review => review._id !== reviewId);
        setReviews(updatedReviews);
      })
      .catch(error => console.error('Error deleting review:', error));
  };
  

  return (
    <Modal show onHide={handleCloseUsers}>
      <Modal.Header closeButton>
        <Modal.Title>Reviews</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table>
          <thead>
            <tr>
              <th>Movie</th>
              <th>Rating</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={index}>
                <td>{review.Movie_Name}</td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedRating}
                      onChange={(e) => setEditedRating(e.target.value)}
                    />
                  ) : (
                    review.Rating
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedFeedback}
                      onChange={(e) => setEditedFeedback(e.target.value)}
                    />
                  ) : (
                    review.Feedback
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <button onClick={handleUpdate}>Update</button>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(index)}>Edit</button>
                      <button onClick={() => handleDelete(review._id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
}

export default Users;
