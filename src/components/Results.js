import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { getMovie } from '../api/api'
import Movie from './Movie'
import image from '../images/png/no-img.png'

const Results=({results, generes, changePage})=>{
  const [movie, setMovie]=useState({})

  const findGeneres=(id)=>{
    const IDs = generes && generes.filter(result=> result.id === id)
    return IDs[0] && IDs[0].name;
  }
  
  const handleChangePage=(page)=>{
    changePage(page)
  }

  const showDetails=(id)=>{
    id && getMovie(id)
    .then(movie=>setMovie({movie}))
    .catch(err=> console.warn('Error', err))
  }

  const closeDetails=()=>{
    setMovie({})
  }

  return(
    <div className="results">
      <h2>{results.total_results ? results.total_results : "No"} results</h2>
      <ul className="results-list">
        {results.results && results.results.map((result)=>
        <li key={result.id} className="results-list-li" onClick={()=>showDetails(result.id)}>
          <img src={result.poster_path ? 'https://image.tmdb.org/t/p/original/' + result.poster_path : image} alt={`${result.title} poster`}/>
          <div className="results-text">
            <h3>{result.title}</h3>
            <h4>Generes: {result.genre_ids.length && result.genre_ids.map(id=> <span>{findGeneres(id)}, </span>)}</h4>
            <h4>Popularity: <span>{parseInt(result.popularity)}</span></h4>
            <h4>Vote: <span>{result.vote_average} /10</span></h4>
            <h4>Release Date: <span className="results-date">{result.release_date}</span></h4>
          </div>
        </li>)}
      </ul>
      <div class="page-counter" style={results.total_results ? {display: 'flex'} : {display: 'none'} }>
        <i className={results.page === 1 ? "counter__icon--no-display" : "counter__icon"} onClick={()=>handleChangePage(results.page - 1)}></i>
        <span>Page {results.page} of {results.total_pages}</span><i className={results.page === results.total_pages ? "counter__icon--no-display" : "counter__icon counter__icon--next"} onClick={()=>handleChangePage(results.page + 1)}></i>
      </div>
    {Object.values(movie).length > 0 && <Movie data={movie} showDetails={true} closeDetails={closeDetails}/>} */}

    </div>
  )
}
Results.propTypes = {
  results: PropTypes.object,
  generes: PropTypes.array,
  changePage: PropTypes.func,
}

export default Results
