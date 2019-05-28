import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Discover from './components/Discover'
import NoMatch from './components/NoMatch';
import Movie from './components/Movie'
import Header from './components/Header'
import { getMovie, getGeneres } from './api/api'
import ReactLoading from 'react-loading';

class App extends Component {
  state = {
      movie: [],
      generesAll: [],
      loading: true
  }

  componentDidMount() {
    getGeneres()
    .then(generes=>this.setState({generesAll: generes['genres']}))
    .catch(error=>{
      console.warn(error)
    })

    getMovie()
    .then(movie=>this.setState({movie, loading: false}))
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
    const { generesAll, movie, loading } = this.state

    return (
      <Router>
        <section className="movie-app">
        {loading && <div className="loading"><ReactLoading type={'spin'} color={'#66FCF1'} height={200} width={200} /></div>}
            <Header handleOnClick={this.handleOnClick}/>
              <Switch>
                <Route exact path="/" render={() => (<Redirect to="/movieApp"/>)}/>
                <Route path="/movieApp" render={() => (<Movie movieData={movie} generesAll={generesAll}  updateMovie={this.updateMovie}/>)} />)}/>
                <Route path='/discover' render={() => (<Discover generesAll={generesAll}/>)}/>
                <Route component={NoMatch}/>
              </Switch>
        </section>
      </Router>
    );
  }
}

export default App;