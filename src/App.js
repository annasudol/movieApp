import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import MovieRanking from './components/MovieRanking'
import Discover from './components/Discover'
import Home from './components/Home'
import NoMatch from './components/NoMatch';
import Movie from './components/Movie'
import logo from './images/svg/logo.svg'
import Search from './components/Search'
import { getMovie } from './api/api'




class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: [],
      input: '',
    }
  }


  componentDidMount() {
    getMovie(76341)
    .then(movie=>this.setState({loading: false, movie}))
    .catch(error=>{
      console.warn(error)
    })

  }

  handleOnClick=(id)=>{
    getMovie(id)
    .then(movie=>this.setState({loading: false, movie}))
    .catch(error=>{
      console.warn(error)
    })

  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.movie !== nextState.movie;
  }

  render() {

  
    return (
      <Router>
        <section className="movie-app">
          <header>
           <div className="container">
              <Link to="/"><img src={logo} className="logo" alt="logo" /></Link>
                <ul className="nav-list">
                  <li><Link to="/MovieRanking">MovieRanking</Link></li>
                  <li><Link to="/Discover">Discover</Link></li>
                  <li><Search
                        handleOnClick={this.handleOnClick}
                      />
                  </li>
                </ul>
          
              <Switch>
                <Route exact path="/" component={Home} />
                <Route component={MovieRanking}/>
                <Route component={Discover}/>
                <Route component={NoMatch}/>
              </Switch>
           </div>
          </header>
          <Movie movieData={this.state.movie}/>
        </section>
      </Router>
    );
  }
}

export default App;