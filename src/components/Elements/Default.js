import React from 'react';
import Draggable from '../Draggable/Draggable';

const computedStyle = properties => ({
  textAlign: properties ? properties.alignment : null
});

const Default = props => {
  const { content, properties } = props.context;
  return (
    <Draggable id={props.id} properties={properties} style={computedStyle(properties)}>
      {content}
    </Draggable>
  );
};

export default Default;
