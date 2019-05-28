import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatter from '../api/helpers'
import Similar from './Similar'
import image from '../images/png/noimage.png'
import { getSimilar } from '../api/api'

class Movie extends Component {
    state= {
       id: 76341,
       list: []
    }

    componentWillReceiveProps(nextProps) {
        this.setState({id: nextProps.movieData['id']});
        
        getSimilar(nextProps.movieData['id'])
        .then(list=>this.setState({list}))
        .catch(error=>{
        console.warn(error)
        })
    }

    componentDidMount(){

        getSimilar(this.state.id)
        .then(list=>this.setState({list}))
        .catch(error=>{
        console.warn(error)
        })
    }
    handleShowDetails=()=>{
        this.props.closeDetails()
    }
    shouldComponentUpdate(nextState) {
        return this.state.list !== nextState.list;
    }

    render() {
        const { showDetails, generesAll } = this.props;
        const { list } = this.state;
        const data = this.props.movieData;
        const title =data['title'];
        const overview = data['overview'];
        const releaseDate = data['release_date'];
        const popularity = parseInt(data['popularity'])
        const generes = data['genres'];
        const firstGen = generes && generes.slice(0, generes.length - 1);
        const lastGen = generes && generes.slice(generes.length - 1);
        const runtime = data['runtime'];
        const rating = data['vote_average'];
        const budget = data['budget'];
        const revenue = data['revenue'];
        const backdropImg = 'https://image.tmdb.org/t/p/original/' + data['backdrop_path'];
        const posterImg = data['poster_path'] ? 'https://image.tmdb.org/t/p/original/' + data['poster_path'] : image;
        const style = {backgroundImage:  'url(' + backdropImg +')'};
  
       
        return (
          <div className={showDetails && 'movie-sample'}>
                <div className="movie" style={showDetails ? {backgroundImage: 'none', position: 'absolute', top: '5px', left: '10px', zIndex: '3000'} : style}>
                <div className="movie-background" style={!showDetails ? {display: 'none'} : {display: 'fixed'} }>
                    <button className="movie-close-btn" onClick={this.handleShowDetails}><span className="movie-close-icon"></span></button>
                </div>
                <div className="movie__item" style={showDetails && {bottom: '25%', minHeight: '400px'} }>
                    <div className="movie__text">
                        <h1>{title}</h1>
                        {firstGen && firstGen.map(generes => <p>{generes.name}, </p> )}
                        {lastGen && <p>{lastGen[0].name}</p> }
                        <div className="movie__details">
                           <div className="movie__el"><span>Rating:</span><p>{rating}/10</p></div>
                           <div className="movie__el"><span>Popularity</span><p>{popularity}</p></div>
                           <div className="movie__el"><span>Release date:</span><p>{releaseDate ? releaseDate : 'no Data'}</p></div>
                           <div className="movie__el"><span>Run Time:</span><p>{runtime ? runtime : 'no Data'}</p></div>
                           <div className="movie__el"><span>Budget:</span><p>{formatter.format(budget)}</p></div>
                           <div className="movie__el"><span>Revenue:</span><p> {formatter.format(revenue)}</p></div>
                        </div>
                        <div className="movie__overview movie__overview--text"><p>{overview}</p></div>
                    </div>
                    <div className="movie__image"><img src={posterImg} alt="poster"/></div>
                    <div className="movie__overview"><p>{overview}</p> 

                    </div>
                    {!showDetails && <Similar list={list.results} generes={generesAll} updateMovie={this.props.updateMovie}/> }
                </div>

            </div>
          </div>
        );
    }
}

Movie.propTypes = {
    movieData: PropTypes.object,
    closeDetails: PropTypes.func
};

export default Movie;