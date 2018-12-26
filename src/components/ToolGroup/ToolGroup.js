import React, { Component } from 'react';
import './collapse.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import PropTypes from 'prop-types';
import Tool from '../Tool/Tool';

class ToolGroup extends Component {

  state = {
    collapse: false
  };

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  componentDidMount = () => {
    this.setState({
      collapse: this.props.collapse
    });
  };

  render = () => (
    <div>
      <div className="rounded-lg border border-grey-light bg-white mb-5 w-full">
        <h4
          onClick={ () => this.toggle() }
          className="m-1 collapse-handler p-3 font-medium  bg-white"
        >
          {this.props.title}
        </h4>
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 300 }
        >
          {this.state.collapse === false ? null : (
            <div className="border-t border-grey-light ">
              {this.props.description ? (
                <p className="p-4 font-thin text-sm border-b border-grey-light">
                  {this.props.description}
                </p>
              ) : null}
              {this.props.tools &&
                this.props.tools.map((tool, i) => (
                  <Tool
                    key={ i }
                    icon={ tool.icon }
                    properties={ tool.properties }
                    type={ tool.type }
                    title={ tool.title }
                  />
                ))}
            </div>
          )}
        </ReactCSSTransitionGroup>
      </div>
    </div>
  );
}

ToolGroup.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tools: PropTypes.array.isRequired,
  collapse: PropTypes.bool.isRequired
};

export default ToolGroup;
