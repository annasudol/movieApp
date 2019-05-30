import React from 'react';
import PropTypes from "prop-types";
import { getMovie } from '../api/api'
import Slider from "react-slick";

const Similar=({list, generes, updateMovie})=>{
    const results = list && list.results
    const settings= {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const showDetails=(id)=>{   
        id && getMovie(id)
        .then()
        .then(movie=>updateMovie(movie))
    }

    const findGeneres=(id)=>{
        const IDs = generes && generes.filter(result=> result.id === id)
        return IDs[0] && IDs[0].name
    }

    return(
        <div className="similar">
            <h2>{results && (results.length > 0 && 'Similar movies:')}</h2>
            <Slider {...settings}>
                {results && (results.length > 0 && results.map((result)=>
                    <div key={result.id} className="similar__item" onClick={()=>showDetails(result.id)}>
                        <img src={result.poster_path ? 'https://image.tmdb.org/t/p/original/' + result.poster_path : '../images/png/noimage.png'} alt={`${result.title} poster`}/>
                        <div className="similar__text">
                            <h3>{result.title}</h3>
                            <h4>Release Date: <span className="results-date">{result.release_date}</span></h4>
                            <h4>Generes: {result.genre_ids.length && result.genre_ids.slice(0, result.genre_ids.length - 1).map(id=> <span>{findGeneres(id, generes)}, </span>)} {result.genre_ids.length && result.genre_ids.slice(result.genre_ids.length - 1).map(id=> <span>{findGeneres(id)} </span>)} </h4>
                            <p className="similar__overview">{result.overview.length > 400 ? (result.overview.substring(0,400) + '...') : result.overview}</p>
                        </div>
                    </div>
                ))
                }
            </Slider>
        </div>)
}

Similar.propTypes = {
    list: PropTypes.object,
    generes: PropTypes.array,
    handleOnClick: PropTypes.func
  }
  
export default Similar
