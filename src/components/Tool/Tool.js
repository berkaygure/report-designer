import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Tool extends React.Component {
  state = {};

  onDragStart = e => {
    var crt = this.currentTarget.cloneNode(true);
    crt.style.position = 'absolute';
    crt.style.top = '0px';
    crt.style.left = '-100px';

    var inner = crt.getElementsByClassName('inner')[0];
    inner.style.backgroundColor = 'orange';
    inner.style.transform = 'rotate(20deg)';

    document.body.appendChild(crt);
    e.dataTransfer.setDragImage(crt, 20, 20);

    e.dataTransfer.setData(
      'tool',
      JSON.stringify({
        title: this.props.title,
        style: this.props.style,
        type: this.props.type
      })
    );
  };

  render = () => (
    <div
      onDragStart={ this.onDragStart }
      className="pl-5 hover:bg-grey-lighter p-2 bg-grey-lightest w-full text-grey-dark border-b border-grey-light text-sm outline-none"
      draggable
    >
      <FontAwesomeIcon className="text-grey-dark mr-2" icon={ this.props.icon } />{' '}
      {this.props.title}
    </div>
  );
}

Tool.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired
};

export default Tool;
