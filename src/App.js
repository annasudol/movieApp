import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import MovieRanking from './components/MovieRanking'
import Discover from './components/Discover'
import Home from './components/Home'
import NoMatch from './components/NoMatch';
import Movie from './components/Movie'
import logo from './images/svg/logo.svg'
const api_key = '463b8bfc45cbc59423a7200dbfcb5351';
const movie_id = '76341';


class App extends Component {

  state={
    movie: {},
    input: ''
  }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api_key}`)
    .then(response=> response.json())
    .then(movie=>this.setState({movie}))
    .catch(error=>{
      console.warn(error)
    })
  }
  handleChange=(e)=>{

    fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=en-US&api_key=${api_key}&query=${e.target.value}`)
    .then(response=> response.json())
    .then(movie=>this.setState({movie}))
    .catch(error=>{
      console.warn(error)
    })

  }

  render() {
    console.log('state', this.state.movie)
    
    return (
      <Router>
        <section className="movie-app">
          <header>
            <Link to="/"><img src={logo} className="logo" alt="logo" /></Link>
            <ul className="nav-list">
              <li><Link to="/MovieRanking">MovieRanking</Link></li>
              <li><Link to="/Discover">Discover</Link></li>
              <li><form className="searchbox"><input placeholder="type movie title"
                   ref="search suggestion"
                   onClick={this.handleChange}
                   className="searchbox__input typeahead form-control"
                   type="text"
                   placeholder="Search Movie Title..."
                   id="q"
              
              ></input></form></li>
            </ul>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={MovieRanking}/>
            <Route component={Discover}/>
            <Route component={NoMatch}/>
          </Switch>
          </header>
          <Movie movieData={this.state.movie}/>
        </section>
      </Router>
    );
  }
}

export default App;
