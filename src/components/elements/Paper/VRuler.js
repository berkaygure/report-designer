import React, { Component } from 'react';
import './Ruler.css';

export default class VRuler extends  Component {



  render() {

    const VRulerTicks = [];
    for (let i = 0; i < this.props.height / 32; i += 1) {
      VRulerTicks.push(
        <div key={i} className="rulerVTick" style={{height: 32, top: 32 * i}}>
          <div className="rulerVNumber">{i}</div>
        </div>,
      );
    }
    return (
      <div className="ruler vertical">
        {VRulerTicks}
        {this.props.show ?
          <div className="rulerFollwerV" style={{display: 'block', top: this.props.followerY, height: this.props.followerHeight,}}/>
          : null}
      </div>
    )
  }
}
