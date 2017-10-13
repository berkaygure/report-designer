import React, { Component } from 'react';
import './Main.css';

export default class Main extends Component {

  render() {
    return (
      <main className={`main ${this.props.className}`}>
        <div style={{padding:20}}>
          {this.props.children}
        </div>

      </main>
    )
  }

}