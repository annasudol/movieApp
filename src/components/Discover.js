import React, { Component } from 'react'
import { discoverMovie } from '../api/api'
import InputRange from 'react-input-range';
import Results from './Results'
import PropTypes from 'prop-types'


export class Discover extends Component {
  state={
    movie: [],
    popularity: 'popularity.desc',
    generes: 12,
    years: {
        min: 1990,
        max: 2010,
    },
  }

  componentDidMount() {
    const {popularity, years, generes} = this.state

    discoverMovie(popularity, years.min, years.max, generes)
    .then(movie=>this.setState({movie}))
    .catch(error=>{
      console.warn(error)
    })
  }

  handleChangePopularity=(event)=>{
    const {years, generes} = this.state
    this.setState({popularity: event.target.value});
    
    discoverMovie(event.target.value, years.min, years.max, generes)
    .then(movie=>this.setState({movie}))
    .catch(error=>{
      console.warn(error)
    })
  }

  handleChangeGenere=(event)=>{
    const {popularity, years} = this.state

    this.setState({generes: event.target.value});
    
    discoverMovie(popularity, years.min, years.max, event.target.value)
    .then(movie=>this.setState({movie}))
    .catch(error=>{
      console.warn(error)
    })
  }

  handleChangeYears=(event)=>{
    const { popularity, generes } = this.state

    this.setState(()=>({years: {
      min: event.min,
      max: event.max
    }}));
  
    discoverMovie(popularity, event.min, event.max, generes)
    .then(movie=>this.setState({movie}))
    .catch(error=>{
      console.warn(error)
    })
  }

  changePage=(page)=>{
    const { popularity, years, generes } = this.state
    discoverMovie(popularity, years.min, years.max, generes, page)
    .then(movie=>this.setState({movie}))
    .catch(error=>{
      console.warn(error)
    })
  }

  render() {
    const { movie } = this.state;
    const { generesAll } = this.props;
    const popularity = [{"popularity.desc": "The most popular"}, {"popularity.asc": "Least popular"}, {"revenue.desc": "The highest revenue"}, {"revenue.asc": "The lowest revenue"}, {"original_title.desc": "By Title"}]
    const year = new Date().getFullYear()

    return (
     <div className="discover">
        <div className="form">
          <form>
            <select className="default-input option-menu" onChange={this.handleChangePopularity}>
              {popularity.map((el, i)=><option value={Object.keys(el)} key={i}>{Object.values(el)}</option>)}
            </select>
            <select className="default-input option-menu" onChange={this.handleChangeGenere}>
              {generesAll.map((generes)=><option value={generes['id']} key={generes['id']}>{generes['name']}</option>)}
            </select>
            <div className="form__range">
              <h3>Filter by release date</h3>
              <InputRange
                draggableTrack
                maxValue={year}
                minValue={1940}
                onChange={this.handleChangeYears}
                value={this.state.years} 
              />
            </div>
          </form>
         
      </div>
      <Results results={movie} list={movie.results} generes={generesAll} changePage={this.changePage}/>
     </div>
    )
  }
}
Discover.propTypes = {
  generesAll: PropTypes.array
}

export default Discover
