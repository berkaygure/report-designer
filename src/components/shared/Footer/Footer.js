import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {
  render(){
    return (
      <footer className="footer">
        <div className="container">
          <span className="text-muted">
            &copy; {new Date().getFullYear()} Net Esnaf.
          </span>
          <span className="text-muted pull-right">
             Made with &nbsp;<i className="fa fa-heart" style={{color:'#cd0000'}}/>
          </span>
        </div>
      </footer>

    )
  }
}