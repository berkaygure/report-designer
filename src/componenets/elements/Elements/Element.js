import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from '../../../redux/actions';
import "./Element.css";



class Element extends Component {

  componentDidMount() {
    const that = this;
    this.$el = $(this.el);
    // draggable
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
    // resizable
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
    });

  }

  onActiveElement() {
    this.props.activeElements(this.props.element);
  }

  removeItemClick() {
    this.props.removeItem(this.props.element);
    this.props.activeElements({id: -1, x: 0, y: 0, properties: {}});

  }


  render(){

    const elementStyle = {
      left: this.props.element.x,
      top: this.props.element.y,
      height: this.props.element.h,
      width: this.props.element.w,
      textAlign: this.props.element.properties.align,
      border:
        this.props.activeElement.id !== this.props.element.id
          ? 'thin solid #eee'
          : 'thin solid #336699',
    };

    if (this.props.element.properties.colors !== undefined) {
      if (this.props.element.properties.colors.backColor !== undefined) {
        elementStyle.backgroundColor = this.props.element.properties.colors.backColor;
      }
      if (this.props.element.properties.colors.foreColor !== undefined) {
        elementStyle.color = this.props.element.properties.colors.foreColor;
      }
    }
    if (this.props.element.properties.font !== undefined) {
      const font = this.props.element.properties.font;
      if (font.bold) {
        elementStyle.fontWeight = 'bolder';
      } else {
        elementStyle.fontWeight = 'normal';
      }
      if (font.italic) {
        elementStyle.fontStyle = 'italic';
      } else {
        elementStyle.fontStyle = 'normal';
      }
      if (font.underline) {
        elementStyle.textDecoration = 'underline';
      } else {
        elementStyle.textDecoration = 'none';
      }
      if (font.fontFamily !== '') {
        elementStyle.fontFamily = font.fontFamily;
      }
      if (font.size) {
        elementStyle.fontSize = font.size;
      }
    }

    return (
      <div className={'element'} style={elementStyle} onClickCapture={this.onActiveElement.bind(this)} ref={ el => { this.el = el }}>
        {this.props.activeElement.id === this.props.element.id ? (
          <a onClickCapture={this.removeItemClick.bind(this)} className="closeBtn">
            &times;
          </a>
        ) : null}
        {this.props.element.properties.content}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    activeElement: state.activeElement.element,
  };
};
export default connect(mapStateToProps, actions)(Element);
