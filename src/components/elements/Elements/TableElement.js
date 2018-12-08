import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from '../../../redux/actions';
import Table from './Table/Table';
import './Element.css';

class TableElement extends Component {

  componentDidMount() {
    const that = this;
    this.$el = $(this.el);
    this.$el.draggable({
      containment: '#paper',
      start() {
        that.props.activeElements(that.props.element);
      },
      drag() {
        const position = $(this).position();
        const size = {
          w: that.props.element.w,
          h: that.props.element.h,
        };
        that.props.onDrag(position, size);
      },
    });
    this.$el.resizable({
      containment: '#paper',
      start() {
        that.props.activeElements(that.props.element);
      },
      resize(event, ui) {
        const position = $(this).position();
        const size = {
          w: ui.size.width,
          h:ui.size.height
        };
        that.props.onDrag(position, size);
      },
      stop() {
        that.forceUpdate();
      },
    });
  }

  componentWillUnmount() {
    this.$el.draggable('destroy');
    this.$el.resizable('destroy');
  }
  onActiveElement() {
    this.props.activeElements(this.props.element);
  }

  removeItemClick() {
    this.props.removeItem(this.props.element);
    this.props.activeElements({id: -1, x: 0, y: 0, properties: {}});
  }


  render() {
    const elementStyle = {
      left: this.props.element.x,
      top: this.props.element.y,
      height: this.props.element.h,
      textAlign: this.props.element.properties.align,
      width: this.props.element.w,
      border:
        this.props.activeElement.id !== this.props.element.id
          ? 'thin solid #eee'
          : 'thin solid #336699',
    };
    return (
      <div id="table" className={'table-element'} onClickCapture={this.onActiveElement.bind(this)} style={elementStyle} ref={el => {this.el = el;}}>
        {this.props.activeElement.id === this.props.element.id ? (
          <a onClickCapture={this.removeItemClick.bind(this)} className="closeBtn">
            &times;
          </a>
        ) : null}
        <Table element={this.props.element} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    activeElement: state.activeElement.element,
  };
};
export default connect(mapStateToProps, actions)(TableElement);
