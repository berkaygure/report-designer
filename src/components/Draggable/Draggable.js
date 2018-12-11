import React, { Component } from 'react';
import * as ReactDraggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import './Draggable.css';
import { connect } from 'react-redux';
import { makeElementActive } from '../../redux/actions';
class Draggable extends Component {
  state = { width: 200, height: 50, isActive: false };

  onSelectItem = () => {
    this.props.makeElementActive(this.props.id);
  };

  componentDidMount = () => {
    this.setState({
      width: this.props.style.width,
      height: this.props.style.height
    });
  };

  onResize = (event, data) => {
    this.onSelectItem();
    const { element, size } = data;
    const { width, height } = size;
    const widthChanged = width !== this.state.width;
    const heightChanged = height !== this.state.height;

    if (!widthChanged && !heightChanged) return;

    this.setState({ width, height }, () => {
      if (this.props.onResize) {
        this.props.onResize(event, { element, size: { width, height } });
      }
    });
  };

  onStartDrag = () => {
    this.onSelectItem();
  };

  render() {
    const { width, height } = this.state;
    const { id, activeElement, style } = this.props;
    return (
      <ReactDraggable
        onStart={ () => this.onStartDrag() }
        bounds="parent"
        defaultPosition={ {
          x: style.x,
          y: style.y
        } }
        cancel=".react-resizable-handle"
      >
        <Resizable
          className="box"
          height={ height }
          width={ width }
          onResize={ this.onResize.bind(this) }
          draggableOpts={ { onResize: e => e.stopPropagation() } }
        >
          <div
            onClick={ () => this.onSelectItem() }
            className={ `draggable ${
              activeElement && id == activeElement.id ? 'active' : ''
            }` }
            style={ { width: width, height: height } }
          >
            {this.props.children}
          </div>
        </Resizable>
      </ReactDraggable>
    );
  }
}

const mapStateToProp = state => {
  return {
    ...state,
    activeElement: state.appReducers.activeElement
  };
};

export default connect(
  mapStateToProp,
  {
    makeElementActive
  }
)(Draggable);
