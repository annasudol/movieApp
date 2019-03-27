import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getMovie } from '../api/api'
import Movie from './Movie'

export default class Results extends Component {
state= {
    movie: {},
}
  shouldComponentUpdate(nextState, nextProps) {
        return this.props.results !== nextProps.results || this.state.movie !== nextState.movie;
  }

  findGeneres=(id)=>{
      const IDs = this.props.generes.filter(result=> result.id === id)
      return IDs && IDs[0].name
  }
  
  handleChangePage=(page)=>{
    this.props.changePage(page)
  }

  showDetails=(id)=>{

  id && getMovie(id)
  .then(movie=>this.setState({movie}))
    
  }

  closeDetails=()=>{
      this.setState({movie: {}})
  }
  render() {
    const { list, results } = this.props
    const { movie } = this.state

    return (
      <div className="results">
        <h2>{results.total_results ? results.total_results : "No"} results</h2>
        <ul className="results-list">
        {list && list.map((result)=>
        <li key={result.id} className="results-list-li" onClick={()=>this.showDetails(result.id)}>
            <img src={result.poster_path ? 'https://image.tmdb.org/t/p/original/' + result.poster_path : '../images/png/noimage.png'} alt={`${result.title} poster`}/>
            <div className="results-text">
                <h3>{result.title}</h3>
                <h4>Generes: {result.genre_ids.map(id=> <span>{this.findGeneres(id)}, </span>)}</h4>
                <h4>Popularity: <span>{parseInt(result.popularity)}</span></h4>
                <h4>Vote: <span>{result.vote_average}</span></h4>
                <h4>Release Date: <span className="results-date">{result.release_date}</span></h4>
            </div>
        </li>)}
        </ul>
        <div class="page-counter">
            <i className={results.page === 1 ? "counter__icon--no-display" : "counter__icon"} onClick={()=>this.handleChangePage(results.page - 1)}></i>
            <span>Page {results.page} of {results.total_pages}</span><i className={results.page === results.total_pages ? "counter__icon--no-display" : "counter__icon counter__icon--next"} onClick={()=>this.handleChangePage(results.page + 1)}></i>
        </div>
       {Object.values(this.state.movie).length > 0 && <Movie movieData={movie} showDetails={true} closeDetails={this.closeDetails}/>}
      </div>
    )
  }
}

Results.propTypes = {
    results: PropTypes.object,
    list: PropTypes.array,
    generesAll: PropTypes.array,
    changePage: PropTypes.func
};

