import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Users from '../Users';
import './landing.css';

const Landing = () => {
  const [movies, setMovies] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleReviewButtonClick = () => {
    setShowUsers(true);
  };

  const handleCloseUsers = () => {
    setShowUsers(false);
  };

  return (
    <div>
      <div className="container">
        <h1><b>DC Movies</b></h1>
        <button  id='review1'onClick={handleReviewButtonClick}> View Reviews</button>
        <Link to='/create'><button id='review'>Review</button></Link>
        <Link to='/login'><button id='login1'>Login</button></Link>
        <div id="movieList" className="movieList">
          {movies.map((movie) => (
            <div key={movie._id} className="movieBox">
              <h2>{movie.Movie_Title}</h2>
              <p>Box (Office in millions): {movie.Box_Office}</p>
              <p>Rating (out of 10): {movie.Rating}</p>
            </div>
          ))}
        </div>

        {showUsers && <Users handleCloseUsers={handleCloseUsers} />}
      </div>
    </div>
  );
};

export default Landing;
