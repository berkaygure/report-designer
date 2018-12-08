import React, { Component } from 'react';

export default class AlertBox extends Component {
  render() {
    return (
      <div className={`alert alert-${this.props.type}`}>
        <p>
          <strong>{this.props.title}</strong> <br/>
          {this.props.message}
        </p>
      </div>
    )
  }
}