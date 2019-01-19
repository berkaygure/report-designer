// @flow
import React from 'react';
import Draggable from '../Draggable/Draggable';

type Props = {
  context: {
    properties: {
      alignment?: string
    },
    content: string
  },
  id: string
};

const computedStyle = properties => ({
  textAlign: properties ? properties.alignment : null
});

const Default = ({ id, context }: Props) => {
  const { content, properties } = context;
  return (
    <Draggable id={id} properties={properties} style={computedStyle(properties)}>
      {content}
    </Draggable>
  );
};

export default Default;
