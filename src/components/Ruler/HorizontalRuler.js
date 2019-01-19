// @flow
import React from 'react';
import { PER_PIXEL } from '../../helpers/Dimensions';

import './Ruler.css';

type Props = {
  width: number,
  followerW: ?number,
  followerX: ?number
};

class HorizontalRuler extends React.Component<Props> {
  renderTicks() {
    const { width } = this.props;
    const HRulerTicks = [];
    for (let i = 0; i < Math.ceil(width / PER_PIXEL); i += 1) {
      HRulerTicks.push(
        <div key={i} className="tick" style={{ width: PER_PIXEL, left: PER_PIXEL * i }}>
          <div className="rulerHNumber">{i}</div>
        </div>
      );
    }

    return HRulerTicks;
  }

  render() {
    const { followerW, followerX } = this.props;

    return (
      <div className="ruler ruler-h">
        {this.renderTicks()}
        {followerW !== null && followerX !== null ? (
          <div
            className="ruler-follower-h"
            style={{
              left: followerX,
              width: followerW
            }}
          />
        ) : null}
      </div>
    );
  }
}

export default HorizontalRuler;
