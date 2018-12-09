import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Tool extends React.Component {
  state = {};

  render = () => (
    <div
      onDragStart={ e => e.dataTransfer.setData('test', 1) }
      className="text-center hover:bg-grey-lighter p-2 bg-grey-lightest w-full text-grey-dark border-b border-grey-lighter text-sm outline-none"
      draggable
    >
      <FontAwesomeIcon className="text-grey-dark" icon={ this.props.icon } />{' '}
      {this.props.title}
    </div>
  );
}

Tool.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Tool;
