import React from 'react'
import { Link} from "react-router-dom";
import PropTypes from 'prop-types';
import logo from '../images/svg/logo.svg'
import Search from './Search'


const Header=({handleOnClick})=> {
    return (
      <header className="header">
        <div className="menu">
          <div className="container-menu">
            <Link to="/movieApp"><img src={logo} className="logo" alt="logo" /></Link>
            <ul className="nav-list">
                <li><Link to="/discover" className="nav-lis--link">Discover</Link></li>
                <li><Link to="/movieApp"><Search handleOnClick={handleOnClick}/></Link></li>
            </ul>
          </div>
        </div>
        </header>
    )
}
Header.propTypes = {
  handleOnClick: PropTypes.func,
};

export default Header;