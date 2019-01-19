// @flow
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import Tool from './Tool';

import './collapse.css';

type Props = {
  description: string,
  title: string,
  tools: [],
  collapse: boolean
};

type State = {
  collapse: boolean
};

class Panel extends React.Component<Props, State> {
  state = {
    collapse: false
  };

  componentDidMount = () => {
    const { collapse } = this.props;
    this.setState({
      collapse
    });
  };

  toggle = () => {
    this.setState(state => ({
      collapse: !state.collapse
    }));
  };

  render = () => {
    const { title, description, tools } = this.props;
    const { collapse } = this.state;
    return (
      <div>
        <div className="rounded-lg border border-grey-light bg-white mb-5 w-full">
          <button
            type="button"
            onClick={() => this.toggle()}
            className="m-1 collapse-handler p-3 font-medium  bg-white"
          >
            {title}
          </button>
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {collapse === false ? null : (
              <div className="border-t border-grey-light ">
                {description ? (
                  <p className="p-4 font-thin text-sm border-b border-grey-light">{description}</p>
                ) : null}
                {tools &&
                  tools.map((tool, i) => (
                    <Tool
                      key={i}
                      icon={tool.icon}
                      properties={tool.properties}
                      type={tool.type}
                      title={tool.title}
                    />
                  ))}
              </div>
            )}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  };
}

export default Panel;
