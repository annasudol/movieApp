import React, { Component } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import vinyl from './images/svg/dj-mixer.svg'
import { connect } from 'react-redux';
import { fetchUser } from './actions/userActions';
import { setToken } from './actions/tokenActions';

import Header from './components/Header'
import PlayList from './components/PlayList'
class App extends Component {
   state = {
      token: null,
    };

  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({ token: _token});
      this.props.dispatch(setToken(_token));
      this.props.dispatch(fetchUser(_token));
  

    }
  }




  render() {

    return (
      <div>
          {!this.state.token ? (
            <div className="app">
              <div className="logo"><p>guess the <br />so<span>ng</span> game</p></div>
              <img src={vinyl} alt="vinyl player" className="vinyl"/>
              <a
                className="btn btn--yellow"
                href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                  "%20"
                )}&response_type=token&show_dialog=true`}
              >
              login to spotify
              </a>
            </div>)
            : (<div className="app--main">
              <Header/>
              <PlayList/>
            </div>)
          }
    
      </div>
    );
}
}

function mapStateToProps ({tokenReducer, userReducer}) {
  return {
    token: tokenReducer.token,
    user: userReducer.user
  }
}
export default connect(mapStateToProps)(App);
