import React, { Component } from 'react'
import logo from '../images/svg/logo.svg'
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const name = this.props.user && this.props.user.display_name
    const img = this.props.user && this.props.user.images[0].url

    return (
      <header className="header">
        <div className="container">
          <div className="header__logo"><img src={logo} alt="logo" className="logo-img"/></div>
          <div className="header__info"><p>hello {name}!</p><img src={img} alt="img" className="user-img"/></div>
        </div>
      </header>
    )
  }
}

function mapStateToProps ({userReducer}) {
  return {
    user: userReducer.user
  }
}

export default connect(mapStateToProps)(Header)

