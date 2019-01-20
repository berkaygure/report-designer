// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import VerticalRuler from '../Ruler/VerticalRuler';
import HorizontalRuler from '../Ruler/HorizontalRuler';
import { Default } from '../Elements';

import './Editor.css';
import { addToScene, makeElementActive } from '../../redux/actions';

type Props = {
  showRuler?: string | boolean,
  width: 950,
  height: 672,
  objects?: {},
  addToScene: Function,
  activeElement: {
    properties: { location: { x: number, y: number }, size: { w: number, h: number } }
  },
  makeElementActive: Function
};

class Editor extends Component<Props> {
  static defaultProps = {
    showRuler: true,
    objects: {}
  };

  onDrop = e => {
    const tool = JSON.parse(e.dataTransfer.getData('tool'));
    // eslint-disable-next-line no-shadow
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
    // eslint-disable-next-line no-shadow
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
    const isX = typeof showRuler === 'string' && showRuler.toLocaleLowerCase() === 'x';

    return showRuler === true || isX ? (
      <HorizontalRuler
        followerW={activeElement ? activeElement.properties.size.w : null}
        followerX={activeElement ? activeElement.properties.location.x : null}
        width={width}
      />
    ) : null;
  }

  /**
   *  Vertical Ruler instance
   */
  rulerY() {
    const { showRuler, activeElement, height } = this.props;
    const isY = typeof showRuler === 'string' && showRuler.toLocaleLowerCase() === 'y';

    return showRuler === true || isY ? (
      <VerticalRuler
        followerH={activeElement ? activeElement.properties.size.h : null}
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
