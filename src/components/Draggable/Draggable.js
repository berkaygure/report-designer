import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Rnd } from 'react-rnd';

import { makeElementActive, changeProperties } from '../../redux/actions';
import DraggableRemoveHandler from './DraggableRemoveHandler';
import './Draggable.css';

const resizeHandlerClasses = {
  right: 'leftAndRight',
  left: 'leftAndRight',
  top: 'topAndBottom',
  bottom: 'topAndBottom',
  bottomLeft: 'handler',
  bottomRight: 'handler',
  topLeft: 'handler',
  topRight: 'handler'
};

class Draggable extends Component {
  static propTypes = {
    id: PropTypes.string,
    activeElement: PropTypes.object,
    style: PropTypes.object,
    properties: PropTypes.object,
    onResize: PropTypes.func,
    makeElementActive: PropTypes.func,
    changeProperties: PropTypes.func
  };

  /**
   *  When element clicked.
   */
  onSelectItem = () => {
    this.makeActiveIfIsNot();
  };

  /**
   * While element resizing on page.
   */
  onResize = (e, direction, ref, delta, position) => {
    this.makeActiveIfIsNot();
    this.props.changeProperties({
      location: {
        x: position.x,
        y: position.y
      },

      size: {
        width: ref.clientWidth,
        height: ref.clientHeight
      }
    });
  };

  /**
   * While element dragging on page.
   */
  onDrag = (event, data) => {
    this.makeActiveIfIsNot();

    this.props.changeProperties({
      location: {
        x: data.x,
        y: data.y
      }
    });
  };

  /**
   * If element not selected yet make selected.
   */
  makeActiveIfIsNot() {
    if (!this.isElementSelected()) {
      this.props.makeElementActive(this.props.id);
    }
  }

  /**
   *  Am i selected?
   */
  isElementSelected = () => {
    return this.props.activeElementId === this.props.id;
  };

  render() {
    const { location, size } = this.props.properties;

    if (this.props.activeElement) {
      const { location, size } = this.props.activeElement.properties;
    }

    return (
      <Rnd
        bounds="parent"
        size={size}
        position={location}
        onClick={this.onSelectItem.bind(this)}
        onDragStart={this.onSelectItem}
        onResizeStart={this.onSelectItem}
        onDrag={this.onDrag.bind(this)}
        onResize={this.onResize.bind(this)}
        resizeHandleClasses={resizeHandlerClasses}
        className={`draggable ${this.isElementSelected() ? 'active' : ''}`}
        resizeHandleWrapperClass={`resizeHandlerWrapper ${
          this.isElementSelected() ? 'active' : ''
        }`}
      >
        {this.props.children}
        {this.isElementSelected() ? <DraggableRemoveHandler /> : null}
      </Rnd>
    );
  }
}

const mapStateToProp = state => {
  return {
    ...state,
    activeElement: state.appReducers.activeElement,
    activeElementId: state.appReducers.activeElement ? state.appReducers.activeElement.id : null
  };
};

export default connect(
  mapStateToProp,
  {
    makeElementActive,
    changeProperties
  }
)(Draggable);
