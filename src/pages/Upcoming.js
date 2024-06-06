import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Upcoming() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=1')
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching upcoming movies:', error);
      });
  }, []);

  return (
    <div className="container">
      <h1>Upcoming Movies</h1>
      <div className="row">
        {movies.map(movie => (
          <div className="col-md-3" key={movie.id}>
            <div className="card mb-4">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt={movie.title} />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.overview}</p>
                <Link to={`/movie/${movie.id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Upcoming;
