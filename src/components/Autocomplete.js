import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { getSearchQueryMovie, getMovie } from '../api/api'
class Autocomplete extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",
    };
  }

  // Event fired when the input value is changed
  onChange = e => {
    const userInput = e.target.value;
    getSearchQueryMovie(userInput)
    .then(movies=>this.setState({movies: movies.results}))
    .catch(error=>{
      console.warn(error)
    })

    const suggestions = this.state.movies && this.state.movies.map(movie=> ({title: movie.title, id: movie.id}))
    suggestions && this.setState({
        filteredSuggestions: suggestions,
        showSuggestions: true,
        userInput: userInput
      });
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // // Update the user input and reset the rest of the state
    this.setState({
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.title,
    });
    this.props.handleOnClick(e.id)
  };




  render() {
    const { onChange, onClick } = this
    const { filteredSuggestions, showSuggestions, userInput } = this.state;
    
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
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          onChange={onChange}
          value={userInput}
          placeholder="Search Movie Title..."
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default Autocomplete;