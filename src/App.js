import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Discover from './components/Discover'
import NoMatch from './components/NoMatch';
import Movie from './components/Movie'
import Header from './components/Header'
import { getMovie, getGeneres } from './api/api'
import ReactLoading from 'react-loading';

const App =()=> {
  const [movie, setMovie] = useState([]);
  const [id, setId] = useState('76341')
  const [generesAll, setGeneresAll] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      getGeneres()
        .then(generes=>setGeneresAll(generes['genres']))
        .catch(error=>{
          console.warn(error)
        })
      setLoading(false);
      getMovie()
        .then(movie=>setMovie(movie))
        .catch(error=>{
          console.warn(error)
        })
      };
    fetchData();
  }, []);

  const handleOnClick=(id)=>{
    setId(id)
    getMovie(id)
      .then(movie=>setMovie(movie))
      .catch(error=>{
        console.warn(error)
    })
  }

  const updateMovie=(movie)=>{
    setMovie(movie)
    setId(movie.id)
  }

  return (
    <Router>
      <section className="movie-app">
        {loading && <div className="loading"><ReactLoading type={'spin'} color={'#66FCF1'} height={200} width={200} /></div>}
            <Header handleOnClick={handleOnClick}/>
              <Switch>
                <Route exact path="/" render={() => (<Redirect to="/movieApp"/>)}/>
                <Route path="/movieApp" render={() => (<Movie id={id} data={movie} generesAll={generesAll}  updateMovie={updateMovie}/>)} />)}/>
                <Route path='/discover' render={() => (<Discover generesAll={generesAll}/>)}/>
                <Route component={NoMatch}/>
              </Switch>
        </section>
   </Router>
  )
}
export default App