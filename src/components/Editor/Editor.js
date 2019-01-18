import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import VerticalRuler from '../Ruler/VerticalRuler';
import HorizontalRuler from '../Ruler/HorizontalRuler';
import { Default } from '../Elements';

import './Editor.css';
import { addToScene, makeElementActive } from '../../redux/actions';

class Editor extends Component {
  static propTypes = {
    showRuler: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    objects: PropTypes.instanceOf(Object),
    addToScene: PropTypes.func.isRequired,
    activeElement: PropTypes.instanceOf(Object).isRequired,
    makeElementActive: PropTypes.func.isRequired
  };

  static defaultProps = {
    showRuler: true,
    width: 672,
    height: 950,
    objects: {}
  };

  onDrop = e => {
    const tool = JSON.parse(e.dataTransfer.getData('tool'));
    const { addToScene } = this.props;

    addToScene(_.uniqueId('element_'), {
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
    const { makeElementActive } = this.props;
    // Maybe this is dirty solution by it works
    if (e.target.classList.contains('editor')) {
      makeElementActive(null);
    }
  };

  /**
   *  Horizontal Ruler instance
   */
  rulerX() {
    const { showRuler, activeElement, width } = this.props;

    return showRuler === true || showRuler.toString().toLocaleLowerCase() === 'x' ? (
      <HorizontalRuler
        followerX={activeElement ? activeElement.properties.location.x : null}
        followerW={activeElement ? activeElement.properties.size.width : null}
        width={width}
      />
    ) : null;
  }

  /**
   *  Vertical Ruler instance
   */
  rulerY() {
    const { showRuler, activeElement, height } = this.props;

    return showRuler === true || showRuler.toString().toLocaleLowerCase() === 'y' ? (
      <VerticalRuler
        followerH={activeElement ? activeElement.properties.size.height : null}
        followerY={activeElement ? activeElement.properties.location.y : null}
        height={height}
      />
    ) : null;
  }

  render() {
    const { objects } = this.props;
    return (
      <div className="w-full flex flex-1 justify-between">
        <div
          onClickCapture={this.onSelectEditor}
          onDragOver={e => e.preventDefault()}
          onDrop={e => this.onDrop(e)}
          className="editor-wrapper"
        >
          {this.rulerX()}
          {this.rulerY()}
          <div className="editor">
            {objects &&
              Object.keys(objects).map(object => {
                const obj = objects[object];
                switch (obj.type) {
                  case 'default':
                    return <Default context={obj} id={object} key={object} />;
                  default:
                    return null;
                }
              })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = state => ({
  objects: state.appReducers.objects,
  activeElement: state.appReducers.activeElement
});

export default connect(
  mapStateToProp,
  {
    addToScene,
    makeElementActive
  }
)(Editor);
