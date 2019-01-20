// @flow
import React from 'react';
import Draggable from '../Draggable/Draggable';

type Props = {
  context?: {
    properties: {
      alignment?: string,
      color?: {
        color: string | null,
        backgroundColor: string | null
      }
    },
    content: string
  },
  id: string
};

const computedStyle = properties => ({
  textAlign: properties ? properties.alignment : null,
  color: properties && properties.color ? properties.color.color : null,
  backgroundColor: properties && properties.color ? properties.color.backgroundColor : null
});

const Default = ({ id, context }: Props) => {
  const { content, properties } = context;
  return (
    <Draggable id={id} properties={properties} style={computedStyle(properties)}>
      {content}
    </Draggable>
  );
};

Default.defaultProps = {
  context: {
    properties: {
      alignment: 'left',
      color: {
        color: '#000',
        backgroundColor: '#fff'
      }
    }
  }
};

export default Default;
