// @flow
import React, { Component } from 'react';
import { PER_PIXEL } from '../../helpers/Dimensions';

import './Ruler.css';

type Props = {
  height: number,
  followerY: ?number,
  followerH: ?number
};

class VerticalRuler extends Component<Props> {
  renderTicks() {
    const VRulerTicks = [];
    const { height } = this.props;
    for (let i = 0; i < Math.ceil(height / PER_PIXEL); i += 1) {
      VRulerTicks.push(
        <div key={i} className="tick" style={{ height: PER_PIXEL, top: PER_PIXEL * i }}>
          <div className="rulerVNumber">{i}</div>
        </div>
      );
    }

    return VRulerTicks;
  }

  render() {
    const { followerY, followerH } = this.props;
    return (
      <div className="ruler ruler-v">
        {this.renderTicks()}
        {followerY !== null && followerH !== null ? (
          <div
            className="ruler-follower-v"
            style={{
              top: followerY,
              height: followerH
            }}
          />
        ) : null}
      </div>
    );
  }
}

export default VerticalRuler;
