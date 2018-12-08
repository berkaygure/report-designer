import React, { Component } from 'react';

export default class CardAccordion extends Component {


  render() {
    const id = window._.uniqueId();
    return (
      <div className="card m-b-0">
          <div className="card-header collapsed" data-toggle="collapse" data-parent={`#${this.props.parent}`} href={`#col${id}`}>
            <a className="card-title">
              {this.props.title}
            </a>
          </div>
          <div id={`col${id}`} className="card-block collapse">
            {this.props.children}
          </div>
      </div>
    )
  }
}