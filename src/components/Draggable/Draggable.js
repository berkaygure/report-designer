import React, { Component } from 'react';
import * as ReactDraggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import './Draggable.css';

class Draggable extends Component {
    state = { width: 200, height: 200 };
    onResize = (event, data) => {
        const { element, size } = data;
        const { width, height } = size;
        const widthChanged = width !== this.state.width, heightChanged = height !== this.state.height;
        if (!widthChanged && !heightChanged) return;

        this.setState({ width, height }, () => {
            if (this.props.onResize) {
                this.props.onResize(event, { element, size: { width, height } });
            }
        });
    };

    render() {
        return (
            <ReactDraggable bounds="parent" cancel=".react-resizable-handle">
                <Resizable className="box" height={ this.state.height } width={ this.state.width } onResize={ this.onResize.bind(this) }
                    draggableOpts={ { onResize: e => e.stopPropagation() } }>
                    <div className="draggable" style={ { width: this.state.width + 'px', height: this.state.height + 'px' } }>
                        <span className="text">Drag me around the world. xD</span>
                    </div>
                </Resizable>
            </ReactDraggable>
        )
    }
}

export default Draggable;