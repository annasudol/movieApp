import React, { useState } from "react";
import PropTypes from "prop-types";
import { getSearchQueryMovie } from '../api/api'

const Search=({handleOnClick})=>{
  const [movies, setMovies] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState('');

  const onChange = e => {
    const userInput = e.target.value;
    getSearchQueryMovie(userInput)
    .then(movies=>setMovies(movies.results))
    .catch(error=>{
      console.warn(error)
    })

    const suggestions = movies && movies.map(movie=> ({title: movie.title, id: movie.id}))
    suggestions && setFilteredSuggestions(suggestions)
    suggestions && setShowSuggestions(true)
    suggestions && setUserInput(userInput)
  };

  // Event fired when the user clicks on a suggestion
  const onClick = e => {

    setFilteredSuggestions([])
    setShowSuggestions(false)
    setUserInput(e.title)

    handleOnClick(e.id)
  };

  let suggestionsListComponent;

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul class="suggestions">
          {filteredSuggestions.map((suggestion) => {
            return (
              <li key={suggestion.id} onClick={()=>onClick(suggestion)}>
                {suggestion.title}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <ul class="suggestions">
          <li>No suggestions!</li>
        </ul>
      );
    }
  }
  return(
    <>
        <input
          type="text"
          onChange={onChange}
          value={userInput}
          placeholder="Search Movie Title..."
        />
        {suggestionsListComponent}
    </>
  )
}
Search.propTypes = {
  handleOnClick: PropTypes.func
}

export default Search;