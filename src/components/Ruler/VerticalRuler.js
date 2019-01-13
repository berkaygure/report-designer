import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PER_PIXEL } from '../../helpers/Dimensions';
import './Ruler.css';

class VerticalRuler extends Component {
  renderTicks() {
    const VRulerTicks = [];
    for (let i = 0; i < Math.ceil(this.props.height / PER_PIXEL); i++) {
      VRulerTicks.push(
        <div key={i} className="tick" style={{ height: PER_PIXEL, top: PER_PIXEL * i }}>
          <div className="rulerVNumber">{i}</div>
        </div>
      );
    }

    return VRulerTicks;
  }

  render() {
    return (
      <div className="ruler ruler-v">
        {this.renderTicks()}
        {this.props.followerY && this.props.followerH ? (
          <div
            className="ruler-follower-v"
            style={{
              top: this.props.followerY,
              height: this.props.followerH
            }}
          />
        ) : null}
      </div>
    );
  }
}

VerticalRuler.propTypes = {
  height: PropTypes.number,
  followerY: PropTypes.number,
  followerH: PropTypes.number
};

export default VerticalRuler;
