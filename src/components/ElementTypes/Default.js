import React from 'react';
import Draggable from '../Draggable/Draggable';

const Default = props => {
  const { content, properties } = props.context;
  return (
    <Draggable id={props.id} properties={properties}>
      {content}
    </Draggable>
  );
};

export default Default;
