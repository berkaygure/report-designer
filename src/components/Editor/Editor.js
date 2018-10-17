import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HorizontalRuler from '../Ruler/HorizontalRuler';
import VerticalRuler from '../Ruler/VerticalRuler';
import Draggable from '../Draggable/Draggable';
import './Editor.css';

class Editor extends Component {
    render() {
        return (
            <div className="editor-wrapper">
                {this.props.showRuler === true || this.props.showRuler.toString().toLocaleLowerCase() === 'x' ?
                    <HorizontalRuler width={ this.props.width }/>
                : null}
                {this.props.showRuler === true || this.props.showRuler.toString().toLocaleLowerCase() === 'y' ?
                    <VerticalRuler height={ this.props.height }/>
                : null}
                <div className="editor">
                    <Draggable/>
                    <Draggable/>
                    <Draggable/>
                </div>
            </div>);
    }
}

Editor.propTypes = {
    showRuler: PropTypes.oneOf(
        PropTypes.bool,
        PropTypes.oneOf('x', 'y')
    ),
    width: PropTypes.number,
    height: PropTypes.number
};

Editor.defaultProps = {
    showRuler: true,
    width: 672,
    height: 950,
};

export default Editor;