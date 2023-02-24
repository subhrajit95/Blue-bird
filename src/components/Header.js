import React from 'react';
import logo192 from './logo192.png';

export default class Header extends React.Component {
  render(){
    return (
      <h1 className="Header">
        <img id="logoHeader" src={logo192} alt="React"></img>
        <p>Book Library</p>
      </h1>
    );
  }
}