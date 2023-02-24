import React from 'react';
import logo192 from './logo192.png';

export default class Footer extends React.Component {
  render () {
  return (
    <footer className="Footer">
      <p>
        Created with{' '}
        <img id="footerLogo" src={logo192} alt="React Logo"></img> Blue Bird: by Subhrajit
        <br />© All rights reserved
      </p>
    </footer>
  );}
}