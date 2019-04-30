import React, { Component } from 'react'
import { connect } from 'react-redux';
import { playListsID } from '../api/api'
import { fetchPlayList } from '../actions/playListActions'
import Game from './Game'
class PlayList extends Component {
  state={
    id: ''
  }
  start=(id)=>{
    this.setState({id});
  }
  componentDidMount() {
    const { token } = this.props;

    token && playListsID.map(id=> {
        const PlayListId = Object.values(id)[0]
        this.props.dispatch(fetchPlayList(token, PlayListId))
    })
    
   


  }
  render() {
    const { elements, ids } = this.props
    const { id } = this.state

    return (
      <div className="playlists">
        <div className="container">
        {id === '' ? ( <React.Fragment>
            <h2>let's choose the playlist</h2>
            <p>and start the game</p>
            <ul>
            {ids && ids.map(id=> <li key={id} onClick={()=>this.start(id)}><img src={elements[id].images[0].url} className='playlists-img' alt='playlist' /></li>
            )}
            </ul>
         </React.Fragment>) :
         <Game id={id}/>
        }
        </div>
      </div>
    )
  }
}

function mapStateToProps ({tokenReducer, playListReducer}) {

  return {
    token: tokenReducer.token,
    elements: playListReducer.lists,
    ids: playListReducer.lists && Object.keys(playListReducer.lists)
  
  }

}

export default connect(mapStateToProps)(PlayList)
