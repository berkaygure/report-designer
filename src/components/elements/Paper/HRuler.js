import React, { Component } from 'react';
import './Ruler.css';

export default class HRuler extends  Component {



  render() {

    const HRulerTicks = [];
    for (let i = 0; i < this.props.width / 32; i += 1) {
      HRulerTicks.push(
        <div key={i} className="rulerHTick" style={{width: 32, left: 32 * i}}>
          <div className="rulerHNumber">{i}</div>
        </div>
      );
    }
    return (
      <div className="ruler horizontal">
        {HRulerTicks}
        {this.props.show ?
          <div className="rulerFollwerH" style={{display: 'block', left: this.props.followerX, width: this.props.followerWidth,}}/>
          : null}
      </div>
    )
  }
}
