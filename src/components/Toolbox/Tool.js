// @flow
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  title: string,
  icon: string,
  properties: {},
  type: string
};

class Tool extends React.Component<Props> {
  /**
   * Adds json data to dataTransfer object.
   */
  onDragStart = (e: Object) => {
    const { properties, title, type } = this.props;
    e.dataTransfer.setData(
      'tool',
      JSON.stringify({
        title,
        properties,
        type
      })
    );
  };

  render = () => {
    const { icon, title } = this.props;
    return (
      <div
        onDragStart={this.onDragStart}
        className="pl-5 hover:bg-grey-lighter p-2 bg-grey-lightest w-full text-grey-dark border-b border-grey-light text-sm outline-none"
        draggable
      >
        <FontAwesomeIcon className="text-grey-dark mr-2" icon={icon} />
        {title}
      </div>
    );
  };
}

export default Tool;
