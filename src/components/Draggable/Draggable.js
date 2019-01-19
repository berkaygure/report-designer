// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Rnd } from 'react-rnd';

import { makeElementActive, changeProperties, dropElement } from '../../redux/actions';
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

type Props = {
  id: string,
  activeElementId: string,
  activeElement: {
    properties: {
      location: { x: number, y: number },
      size: { height: number | string, width: number | string }
    }
  },
  style: {},
  properties: {
    location: { x: number, y: number },
    size: { height: number | string, width: number | string }
  },
  makeElementActive: Function,
  changeProperties: Function,
  dropElement: Function,
  children: React.Node
};

class Draggable extends React.Component<Props> {
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
    // eslint-disable-next-line no-shadow
    const { changeProperties } = this.props;

    this.makeActiveIfIsNot();

    changeProperties({
      location: {
        x: position.x,
        y: position.y
      },

      size: {
        w: ref.clientWidth,
        h: ref.clientHeight
      }
    });
  };

  /**
   * While element dragging on page.
   */
  onDrag = (event, data) => {
    // eslint-disable-next-line no-shadow
    const { changeProperties } = this.props;

    this.makeActiveIfIsNot();

    changeProperties({
      location: {
        x: data.x,
        y: data.y
      }
    });
  };

  /**
   *  Am i selected?
   */
  isElementSelected = () => {
    const { activeElementId, id } = this.props;

    return activeElementId === id;
  };

  // eslint-disable-next-line react/destructuring-assignment
  dropElement = () => this.props.dropElement(this.props.id);

  /**
   * If element not selected yet make selected.
   */
  makeActiveIfIsNot() {
    if (!this.isElementSelected()) {
      // eslint-disable-next-line no-shadow
      const { makeElementActive, id } = this.props;
      makeElementActive(id);
    }
  }

  render() {
    const { activeElement, properties, style, children } = this.props;
    const { location, size } = this.isElementSelected() ? activeElement.properties : properties;

    return (
      <Rnd
        bounds="parent"
        size={size}
        position={location}
        onClick={this.onSelectItem}
        onDragStart={this.onSelectItem}
        onResizeStart={this.onSelectItem}
        onDrag={this.onDrag}
        onResize={this.onResize}
        resizeHandleClasses={resizeHandlerClasses}
        className={`draggable ${this.isElementSelected() ? 'active' : ''}`}
        style={{ ...style }}
        resizeHandleWrapperClass={`resizeHandlerWrapper ${
          this.isElementSelected() ? 'active' : ''
        }`}
      >
        {children}
        {this.isElementSelected() ? <DraggableRemoveHandler click={this.dropElement} /> : null}
      </Rnd>
    );
  }
}

const mapStateToProp = state => ({
  ...state,
  activeElement: state.appReducers.activeElement,
  activeElementId: state.appReducers.activeElement ? state.appReducers.activeElement.id : null
});

export default connect(
  mapStateToProp,
  {
    makeElementActive,
    changeProperties,
    dropElement
  }
)(Draggable);
