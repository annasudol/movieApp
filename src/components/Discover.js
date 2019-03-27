import React, { Component } from 'react'
import { discoverMovie, getGeneres } from '../api/api'
import InputRange from 'react-input-range';
import Results from './Results'


export class Discover extends Component {
  state={
    movie: [],
    popularity: 'popularity.desc',
    generes: 12,
    years: {
        min: 1990,
        max: 2010,
    },
    generesAll: []
  }

  componentDidMount() {
    const {popularity, years, generes} = this.state

    getGeneres()
    .then(generes=>this.setState({generesAll: generes['genres']}))
    .catch(error=>{
      console.warn(error)
    })

    discoverMovie(popularity, years.min, years.max, generes)
    .then(movie=>this.setState({movie}))
    .catch(error=>{
      console.warn(error)
    })
  }

  handleChangePopularity=(event)=>{
    const {popularity, years, generes} = this.state
    this.setState({popularity: event.target.value});
    
    discoverMovie(popularity, years.min, years.max, generes)
    .then(movie=>this.setState({movie}))
    .catch(error=>{
      console.warn(error)
    })
  }
  handleChangeGenere=(event)=>{
    const {popularity, years, generes} = this.state

    this.setState({generes: event.target.value});
    
    discoverMovie(popularity, years.min, years.max, generes)
    .then(movie=>this.setState({movie}))
    .catch(error=>{
      console.warn(error)
    })
  }

  handleChangeYears=(event)=>{
    const { popularity, years, generes } = this.state

    this.setState(()=>({years: {
      min: event.min,
      max: event.max
    }}));
  
    discoverMovie(popularity, years.min, years.max, generes)
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
    const { generesAll, movie } = this.state;
    const popularity = [ {"popularity.desc": "Popularity descending"},  {"revenue.asc": "Revenue ascending"}, {"revenue.desc": "Revenue descending"}]
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

export default Discover
