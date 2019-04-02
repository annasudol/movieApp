import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Discover from './components/Discover'
import NoMatch from './components/NoMatch';
import Movie from './components/Movie'
import logo from './images/svg/logo.svg'
import Search from './components/Search'
import { getMovie, getGeneres } from './api/api'




class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: [],
      input: '',
      generesAll: []
    }
  }


  componentDidMount() {
    getGeneres()
    .then(generes=>this.setState({generesAll: generes['genres']}))
    .catch(error=>{
      console.warn(error)
    })

    getMovie()
    .then(movie=>this.setState({movie}))
    .catch(error=>{
      console.warn(error)
    })


  }

  handleOnClick=(id)=>{
    getMovie(id)
    .then(movie=>this.setState({movie}))
    .catch(error=>{
      console.warn(error)
    })

  }

  shouldComponentUpdate(nextState) {
    return this.state.movie !== nextState.movie;
  }

  updateMovie=(movie)=>{
    this.setState({movie})
  }

  render() {
    const { generesAll, movie } = this.state
    return (
      <Router>
        <section className="movie-app">
          <header className="header">
              <div className="menu">
                <div className="container-menu">
                  <Link to="/movieApp"><img src={logo} className="logo" alt="logo" /></Link>
                  <ul className="nav-list">
                      <li><Link to="/discover" className="nav-lis--link">Discover</Link></li>
                      <li><Link to="/movieApp"><Search handleOnClick={this.handleOnClick}/></Link></li>
                  </ul>
                </div>
              </div>
              <Switch>
                <Route path='/movieApp' render={() => (<Movie movieData={movie} generesAll={generesAll}  updateMovie={this.updateMovie}/>)} />
                <Route path='/discover' render={() => (<Discover generesAll={generesAll}/>)}/>
                <Route component={NoMatch}/>
              </Switch>
  
          </header>
        </section>
      </Router>
    );
  }
}

export default App;