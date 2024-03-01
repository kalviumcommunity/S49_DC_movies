import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './landing.css'; 

const Landing = () => {
  const [movies, setMovies] = useState([]);

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

  return (
    <div>
      <div className="container">
        <h1>DC Movies</h1>
        <div id="movieList" className="movieList">
          {movies.map(movie => (
            <div key={movie._id} className="movieBox">
              <h2>{movie.Movie_Title}</h2>
              <p>Box (Office in millions): {movie.Box_Office}</p>
              <p>Rating (out of 10): {movie.Rating}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
