import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatter } from '../api/helpers'
import Similar from './Similar'
import image from '../images/png/noimage.png'
import { getSimilar } from '../api/api'

const Movie =({data, id, generesAll, updateMovie, showDetails, closeDetails})=>{
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            getSimilar(id ? id : '76341')
                .then(list=>setList(list))
                .catch(error=>console.warn(error))
        }
        fetchData();
    }, [id]); //similar to comReceivedPropos

    const handleShowDetails=()=>{
        closeDetails()
    }


    const title =data && data['title'];
    const overview = data && data['overview'];
    const releaseDate = data && data['release_date'];
    const popularity = data && parseInt(data['popularity'])
    const generes = data && data['genres'];
    const firstGen = generes && generes.slice(0, generes.length - 1);
    const lastGen = generes && generes.slice(generes.length - 1);
    const runtime = data && data['runtime'];
    const rating = data && data['vote_average'];
    const budget = data && data['budget'];
    const revenue = data && data['revenue'];
    const backdropImg = data && ('https://image.tmdb.org/t/p/original/' + data['backdrop_path']);
    const posterImg = data && data['poster_path'] ? 'https://image.tmdb.org/t/p/original/' + data['poster_path'] : image;
    const style = {backgroundImage:  'url(' + backdropImg +')'};
    return(
        <div className={showDetails && 'movie-sample'}>
            <div className="movie" style={showDetails ? {backgroundImage: 'none', position: 'absolute', top: '5px', left: '10px', zIndex: '3000'} : style}>
                 <div className="movie-background" style={!showDetails ? {display: 'none'} : {display: 'fixed'} }>
                    <button className="movie-close-btn" onClick={handleShowDetails}><span className="movie-close-icon"></span></button>
                </div>
                <div className="movie__item" style={showDetails && {bottom: '25%', minHeight: '400px'} }>
                    <div className="movie__text">
                        <h1>{title}</h1>
                        {firstGen && firstGen.map(generes => <p>{generes.name}, </p> )}
                        {lastGen && <p>{lastGen[0] && lastGen[0].name}</p> }
                        <div className="movie__details">
                            <div className="movie__el"><span>Rating:</span><p>{rating}/10</p></div>
                            <div className="movie__el"><span>Popularity</span><p>{popularity}</p></div>
                            <div className="movie__el"><span>Release date:</span><p>{releaseDate ? releaseDate : 'no Data'}</p></div>
                            <div className="movie__el"><span>Run Time:</span><p>{runtime ? runtime : 'no Data'}</p></div>
                            <div className="movie__el"><span>Budget:</span><p>{formatter.format(budget)}</p></div>
                            <div className="movie__el"><span>Revenue:</span><p> {formatter.format(revenue)}</p></div>
                        </div>
                        {/* <div className="movie__overview movie__overview--text"><p>{overview}</p></div> */}
                    </div>
                    <div className="movie__image"><img src={posterImg} alt="poster"/></div>
                    <div className="movie__overview"><p>{overview}</p></div>
                    {!showDetails && <Similar list={list} generes={generesAll} updateMovie={updateMovie}/> }
                </div>
            </div>
        </div>
    )
}

Movie.propTypes = {
    movieData: PropTypes.object,
    closeDetails: PropTypes.func
};
export default Movie;