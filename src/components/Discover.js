import React, { useState, useEffect } from 'react'
import { discoverMovie } from '../api/api'
import InputRange from 'react-input-range';
import Results from './Results'
import PropTypes from 'prop-types'
import ReactLoading from 'react-loading';

const Discover=({generesAll})=>{
  const [movie, setMovie] = useState([]);
  const [popularity, setPopularity] = useState('popularity.desc');
  const [generes, setGeneres] = useState(12);
  const [years, setYears] = useState({ min: 1990, max: 2010});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
    discoverMovie(popularity, years.min, years.max, generes)
      .then(movie=>setMovie(movie), setLoading(false))
      .catch(error=>{
        console.warn(error)
      })
    };
    fetchData();
  }, []);

  const handleChangePopularity=(e)=>{
    setPopularity(e.target.value)
    discoverMovie(e.target.value, years.min, years.max, generes)
        .then(movie=>setMovie(movie))
        .catch(error=>{
          console.warn(error)
        })
  }

  const handleChangeYears=(e)=>{

    setYears({min: e.min, max: e.max})
    discoverMovie(popularity, e.min, e.max, generes)
    .then(movie=>setMovie(movie))
    .catch(error=>{
      console.warn(error)
    })
  }


  const handleChangeGenere=(e)=>{
    setGeneres(e.target.value)
    discoverMovie(popularity, years.min, years.max, e.target.value)
      .then(movie=>setMovie(movie))
      .catch(error=>{
        console.warn(error)
      })
  }
  const changePage=(page)=>{
    discoverMovie(popularity, years.min, years.max, generes, page)
    .then(movie=>setMovie(movie))
    .catch(error=>{
      console.warn(error)
    })
  }
  const year = new Date().getFullYear()
  const popularityCat = [{"popularity.desc": "The most popular"}, {"popularity.asc": "Least popular"}, {"revenue.desc": "The highest revenue"}, {"revenue.asc": "The lowest revenue"}, {"original_title.desc": "By Title"}]

    return (
     <div className="discover">
        <div className="form">
          <form>
            <select className="default-input option-menu" onChange={handleChangePopularity}>
              {popularityCat.map((el, i)=><option value={Object.keys(el)} key={i}>{Object.values(el)}</option>)}
            </select>
            <select className="default-input option-menu" onChange={handleChangeGenere}>
              {generesAll.map((generes)=><option value={generes['id']} key={generes['id']}>{generes['name']}</option>)}
            </select>
            <div className="form__range">
              <h3>Filter by release date</h3>
              <InputRange
                draggableTrack
                maxValue={year}
                minValue={1940}
                onChange={handleChangeYears}
                value={years} 
              />
            </div>
          </form>
      </div>
      {loading ? <div className="loading"><ReactLoading type={'spin'} color={'#66FCF1'} height={200} width={200} /></div>:
      <Results results={movie} generes={generesAll} changePage={changePage}/>}
     </div>
    )
}
Discover.propTypes = {
  generesAll: PropTypes.array
}
export default Discover
