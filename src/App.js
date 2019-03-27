import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Discover from './components/Discover'
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
    getMovie()
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
    console.log('app',this.state.movie)

    return (
      <Router>
        <section className="movie-app">
          <header className="header">
              <div className="menu">
                <div className="container">
                  <Link to="/"><img src={logo} className="logo" alt="logo" /></Link>
                  <ul className="nav-list">
                      <li><Link to="/MovieRanking" className="nav-lis--link">MovieRanking</Link></li>
                      <li><Link to="/Discover" className="nav-lis--link">Discover</Link></li>
                      <li><Link to="/"><Search handleOnClick={this.handleOnClick}/></Link></li>
                  </ul>
                </div>
              </div>
              <Switch>
              <Route exact path='/' render={() => (
                <Movie movieData={this.state.movie}/>
              )} />
                <Route component={Discover}/>
                <Route component={NoMatch}/>
              </Switch>
  
          </header>
        </section>
      </Router>
    );
  }
}

export default App;