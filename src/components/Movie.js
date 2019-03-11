import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatter from '../api/helpers'
import Loader from 'react-loader-spinner'

class Movie extends Component {
    state={ loading: false }
    render() {

        const data = this.props.movieData;
        const title =data['title'];
        const overview = data['overview'];
        const relaseDate = data['release_date'];
        const popularity = parseInt(data['popularity'])
        const generes = data['genres'];
        const runtime = data['runtime'];
        const rating = data['vote_average'];
        const budget = data['budget'];
        const revenue = data['revenue'];
        const backdropImg = 'https://image.tmdb.org/t/p/original/' + data['backdrop_path'];
        const posterImg = 'https://image.tmdb.org/t/p/original/' + data['poster_path'];
        const style = {backgroundImage:  'url(' + backdropImg +')'};
        return (
            
            <div className="movie" style={style}>
               {this.state.loading ?  <div className="movie__item"><div className="loader"><Loader type="Puff" className="loader" color="#00BFFF" height="200" width="200"/></div> </div>  : (
                <div className="movie__item">
                    <div className="movie__text">
                        <h1>{title}</h1>
                        {generes && generes.map(genere => <p>{genere.name}, </p> )}
                        <div className="movie__details">
                           <div className="movie__el"><span>Rating:</span><p>{rating}</p></div>
                           <div className="movie__el"><span>Popularity</span><p>{popularity}</p></div>
                           <div className="movie__el"><span>Release date:</span><p>{relaseDate}</p></div>
                           <div className="movie__el"><span>Run Time:</span><p>{runtime ? runtime : 'no Data'}</p></div>
                           <div className="movie__el"><span>Budget:</span><p>{formatter.format(budget)}</p></div>
                           <div className="movie__el"><span>Revenue:</span><p> {formatter.format(revenue)}</p></div>
                        </div>
                        <div className="movie__overview movie__overview--text"><p>{overview}</p></div>
                    </div>
                    <div className="movie__image"><img src={posterImg} alt="poster"/></div>
                    <div className="movie__overview"><p>{overview}</p></div>       
                </div>
               )}
            </div>
        );
    }
}

Movie.propTypes = {
    movieData: PropTypes.object
};

export default Movie;