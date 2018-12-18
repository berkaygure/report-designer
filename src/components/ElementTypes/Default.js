import React, { Component } from 'react';
import Draggable from '../Draggable/Draggable';

class Default extends Component {
  render() {
    const { content, id, properties } = this.props.context;
    return (
      <Draggable id={ id } properties={ properties }>
        {content}
      </Draggable>
    );
  }
}

export default Default;
