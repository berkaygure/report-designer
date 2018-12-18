import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HorizontalRuler from '../Ruler/HorizontalRuler';
import VerticalRuler from '../Ruler/VerticalRuler';
import { connect } from 'react-redux';
import { addToScene, makeElementActive } from '../../redux/actions';
import './Editor.css';
import Default from '../ElementTypes/Default';
import _ from 'lodash';

class Editor extends Component {
  onDrop = e => {
    const tool = JSON.parse(e.dataTransfer.getData('tool'));
    this.props.addToScene({
      id: _.uniqueId('element_'),
      type: tool.type,
      content: tool.title,
      style: {
        ...tool.style,
        x: e.clientX - e.currentTarget.offsetLeft,
        y: e.clientY - e.currentTarget.offsetTop
      }
    });
  };

  selectPage = () => {
    this.props.makeElementActive(null);
  };

  render() {
    return (
      <div
        onClickCapture={ () => this.selectPage() }
        onDragOver={ e => e.preventDefault() }
        onDrop={ e => this.onDrop(e) }
        className="editor-wrapper"
      >
        {this.rulerX()}
        {this.rulerY()}
        <div className="editor">
          {this.props.objects &&
            this.props.objects.map(object => {
              switch (object.type) {
                case 'default':
                  return <Default context={ object } key={ object.id } />;
                default:
                  return null;
              }
            })}
        </div>
      </div>
    );
  }

  rulerX() {
    return this.props.showRuler === true ||
      this.props.showRuler.toString().toLocaleLowerCase() === 'x' ? (
      <HorizontalRuler width={ this.props.width } />
    ) : null;
  }
  rulerY() {
    return this.props.showRuler === true ||
      this.props.showRuler.toString().toLocaleLowerCase() === 'y' ? (
      <VerticalRuler height={ this.props.height } />
    ) : null;
  }
}

Editor.propTypes = {
  showRuler: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  objects: PropTypes.array,
  addToScene: PropTypes.func,
  makeElementActive: PropTypes.func
};

Editor.defaultProps = {
  showRuler: true,
  width: 672,
  height: 950
};

const mapStateToProp = (state, props) => {
  return {
    objects: state.appReducers.objects
  };
};

export default connect(
  mapStateToProp,
  {
    addToScene,
    makeElementActive
  }
)(Editor);
