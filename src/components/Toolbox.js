import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ToolGroup from './ToolGroup/ToolGroup';

export default function Toolbox(props) {
  const { tools } = props;
  return (
    <div className="bg-grey-lightest p-3 shadow w-1/4">
      {tools &&
        tools.map(tool => (
          <ToolGroup
            key={_.identity('tool')}
            title={tool.title}
            collapse
            tools={tool.items}
            description={tool.description}
          />
        ))}
    </div>
  );
}

Toolbox.propTypes = {
  tools: PropTypes.arrayOf(PropTypes.object)
};

Toolbox.defaultProps = {
  tools: []
};
