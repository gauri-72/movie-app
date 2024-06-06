import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

function Search() {
  const [movies, setMovies] = useState([]);
  const query = new URLSearchParams(useLocation().search).get('query');

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${query}&page=1`)
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => {
        console.error('Error searching movies:', error);
      });
  }, [query]);

  return (
    <div className="container">
      <h1>Search Results for "{query}"</h1>
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

export default Search;
