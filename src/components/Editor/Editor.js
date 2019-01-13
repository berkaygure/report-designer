import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HorizontalRuler from '../Ruler/HorizontalRuler';
import VerticalRuler from '../Ruler/VerticalRuler';
import { connect } from 'react-redux';
import _ from 'lodash';
import './Editor.css';
import Default from '../ElementTypes/Default';
import { addToScene, makeElementActive } from '../../redux/actions';

class Editor extends Component {
  static propTypes = {
    showRuler: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    objects: PropTypes.object,
    addToScene: PropTypes.func,
    makeElementActive: PropTypes.func
  };

  static defaultProps = {
    showRuler: true,
    width: 672,
    height: 950
  };

  onDrop = e => {
    const tool = JSON.parse(e.dataTransfer.getData('tool'));

    this.props.addToScene(_.uniqueId('element_'), {
      type: tool.type,
      content: tool.title,
      properties: {
        ...tool.properties,
        location: {
          x: e.clientX - e.currentTarget.offsetLeft,
          y: e.clientY - e.currentTarget.offsetTop
        }
      }
    });
  };

  onSelectEditor = e => {
    // Maybe this is dirty solution by it works
    if (e.target.classList.contains('editor')) {
      this.props.makeElementActive(null);
    }
  };

  render() {
    return (
      <div
        onClickCapture={this.onSelectEditor}
        onDragOver={e => e.preventDefault()}
        onDrop={e => this.onDrop(e)}
        className="editor-wrapper"
      >
        {this.rulerX()}
        {this.rulerY()}
        <div className="editor">
          {this.props.objects &&
            Object.keys(this.props.objects).map(object => {
              const obj = this.props.objects[object];
              switch (obj.type) {
                case 'default':
                  return <Default context={obj} id={object} key={object} />;
                default:
                  return null;
              }
            })}
        </div>
      </div>
    );
  }

  /**
   *  Horizontal Ruler instance
   */
  rulerX() {
    return this.props.showRuler === true ||
      this.props.showRuler.toString().toLocaleLowerCase() === 'x' ? (
      <HorizontalRuler
        followerX={this.props.activeElement ? this.props.activeElement.properties.location.x : null}
        followerW={this.props.activeElement ? this.props.activeElement.properties.size.width : null}
        width={this.props.width}
      />
    ) : null;
  }

  /**
   *  Vertical Ruler instance
   */
  rulerY() {
    return this.props.showRuler === true ||
      this.props.showRuler.toString().toLocaleLowerCase() === 'y' ? (
      <VerticalRuler
        followerH={
          this.props.activeElement ? this.props.activeElement.properties.size.height : null
        }
        followerY={this.props.activeElement ? this.props.activeElement.properties.location.y : null}
        height={this.props.height}
      />
    ) : null;
  }
}

const mapStateToProp = state => {
  return {
    objects: state.appReducers.objects,
    activeElement: state.appReducers.activeElement
  };
};

export default connect(
  mapStateToProp,
  {
    addToScene,
    makeElementActive
  }
)(Editor);
