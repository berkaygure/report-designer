import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PER_PIXEL } from '../../helpers/Dimensions';
import './Ruler.css';

class VerticalRuler extends Component {

    renderTicks() {
        const VRulerTicks = [];
        for (let i = 0; i < Math.ceil(this.props.height / PER_PIXEL); i += 1) {
            VRulerTicks.push(
                <div key={ i } className="tick" style={ { height: PER_PIXEL, top: PER_PIXEL * i } }>
                    <div className="rulerVNumber">{i}</div>
                </div>
            );
        }

        return VRulerTicks;
    }

    render() {
        return <div className="ruler ruler-v">
            {this.renderTicks()}
        </div>
    }
}

VerticalRuler.propTypes = {
    height: PropTypes.number
};

export default VerticalRuler;