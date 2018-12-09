import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HorizontalRuler from '../Ruler/HorizontalRuler';
import VerticalRuler from '../Ruler/VerticalRuler';
import Draggable from '../Draggable/Draggable';
import { connect } from 'react-redux';
import { addToScene } from '../../redux/actions';
import './Editor.css';

class Editor extends Component {
  onDrop = e => {
    this.props.addToScene();
  };

  render() {
    return (
      <div
        onDragOver={ e => e.preventDefault() }
        onDrop={ e => this.onDrop(e) }
        className="editor-wrapper"
      >
        {this.rulerX()}
        {this.rulerY()}
        <div className="editor">
          {this.props.objects &&
            this.props.objects.map((object, order) => {
              return <Draggable key={ order } />;
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
  addToScene: PropTypes.func
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
    addToScene
  }
)(Editor);
