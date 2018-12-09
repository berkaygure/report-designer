import React, { Component } from 'react';
import Draggable from '../Draggable/Draggable';

class Default extends Component {
  render() {
    const { content, style, id } = this.props.context;
    return (
      <Draggable id={ id } style={ style }>
        {content}
      </Draggable>
    );
  }
}

export default Default;
