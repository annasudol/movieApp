import React, { Component } from 'react'
import { getMovie } from '../api/api'

export default class Similar extends Component {
    state= {
        movie: {},
    }
    findGeneres=(id)=>{
        const IDs = this.props.generes && this.props.generes.filter(result=> result.id === id)
        return IDs[0] && IDs[0].name
    }

    showDetails=(id)=>{
   
        id && getMovie(id)
        .then(movie=>this.props.updateMovie(movie))
    }
    
    render() {
        const { list } = this.props;
        const results = list && list.slice(0, 4);

            
        return (
            <div className="similar">
                <h2>Similar movies:</h2>
                <ul className="similar-list">
                    {results && results.map((result)=>
                    <li key={result.id} className="similar-li" onClick={()=>this.showDetails(result.id)}>
                        <img src={result.poster_path ? 'https://image.tmdb.org/t/p/original/' + result.poster_path : '../images/png/noimage.png'} alt={`${result.title} poster`}/>

                        <div className="results-text">
                            <h3>{result.title}</h3>
                            <h4>Release Date: <span className="results-date">{result.release_date}</span></h4>
                            <h4>Generes: {result.genre_ids.length && result.genre_ids.map(id=> <span>{this.findGeneres(id)}, </span>)}</h4>
                        </div>
                    </li>
                    )}
            </ul>
            
            </div>
        )
    }
}
