import React from 'react';
import Logo from '../weather.png'
import SearchBar from './SearchBar.jsx';
import './Nav.css';

function Nav({onSearch}) {
  return (
    <div className='navbar'>
      <div>
      <img src={Logo} alt="Img not found" />
      <span>Lucas Parra - Weather App</span>
      </div>
      <SearchBar 
        onSearch={onSearch}
      />
    </div>
  );
};

export default Nav;
