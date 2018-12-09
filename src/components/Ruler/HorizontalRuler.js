import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PER_PIXEL } from '../../helpers/Dimensions';
import './Ruler.css';

class HorizontalRuler extends Component {

    renderTicks() {
        const HRulerTicks = [];
        for (let i = 0; i < Math.ceil(this.props.width / PER_PIXEL); i += 1) {
            HRulerTicks.push(
                <div key={ i } className="tick" style={ { width: PER_PIXEL, left: PER_PIXEL * i } }>
                    <div className="rulerHNumber">{i}</div>
                </div>
            );
        }

        return HRulerTicks;
    }

    render() {
        return <div className="ruler ruler-h">
            {this.renderTicks()}
        </div>
    }
}


HorizontalRuler.propTypes = {
    width: PropTypes.number
};

export default HorizontalRuler;