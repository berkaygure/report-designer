import React, { Component } from 'react';
import  { Rnd }  from 'react-rnd';
import './Draggable.css';
import { connect } from 'react-redux';
import { makeElementActive, updateProperties } from '../../redux/actions';
import PropTypes from 'prop-types';

const resizeHandlerClasses = {
    right: 'leftAndRight',
    left: 'leftAndRight',
    top: 'topAndBottom',
    bottom: 'topAndBottom',
    bottomLeft: 'handler',
    bottomRight: 'handler',
    topLeft: 'handler',
    topRight: 'handler',
}

class Draggable extends Component {
  state = { width: 0, height: 0 };

  onSelectItem = () => {
    this.props.makeElementActive(this.props.id);
  };

  componentDidMount = () => {
    this.setState({
      width: this.props.properties.size.w,
      height: this.props.properties.size.h,
    });
  };

  onStartDrag = () => {
     this.props.makeElementActive(this.props.id);
  };

  onResizeStart = () => {
       this.props.makeElementActive(this.props.id);
  }

  onResize = (e, direction, ref, delta, position) => {
      this.setState({
        width: ref.style.width,
        height: ref.style.height,
      });
  }

  onDrag = (event, data) => {
    if (this.isElementSelected()) {

    }
  };

  isElementSelected = () => {
      return (this.props.activeElement && this.props.activeElement.id === this.props.id)
  }

  render() {
    const { width, height } = this.state;
    const { isActive } = this.props;

    return (
        <Rnd bounds="parent" size={{ width,  height }}
            onDrag={ (e, d) => this.onDrag(e, d)}
            onResizeStart={() => this.onResizeStart()}
            onResize={(e, direction, ref, delta, position) => this.onResize(e, direction, ref, delta, position)}
            resizeHandleClasses={resizeHandlerClasses}
            resizeHandleWrapperClass={ `resizeHandlerWrapper ${isActive ? 'active' : ''}` }
          >
          <div onClick={ () => this.onSelectItem() } style={ { width: width, height: height } }
            className={ `draggable ${isActive ? 'active' : ''}` }>
            {this.props.children}
          </div>
      </Rnd>
    );
  }
}

const mapStateToProp = state => {
  return {
    ...state,
    activeElement: state.appReducers.activeElement,
    isActive: state.appReducers.activeElement ? true : false,
  };
};

Draggable.propTypes = {
  children: PropTypes.object,
  id: PropTypes.string,
  activeElement: PropTypes.object,
  style: PropTypes.object,
  properties: PropTypes.object,
  onResize: PropTypes.func,
  makeElementActive: PropTypes.func,
  updateProperties: PropTypes.func
};

export default connect(
  mapStateToProp,
  {
    makeElementActive,
    updateProperties
  }
)(Draggable);
