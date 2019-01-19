// @flow
import * as React from 'react';
import _ from 'lodash';
import Panel from './Toolbox/Panel';

type Props = {
  tools: []
};

type ToolboxWrapperTypes = {
  children?: React.Node
};

const ToolboxWrapper = ({ children }: ToolboxWrapperTypes) => (
  <div className="bg-grey-lightest p-3 shadow w-1/4">{children}</div>
);

ToolboxWrapper.defaultProps = {
  children: null
};

export default function Toolbox({ tools }: Props) {
  if (!tools) return <ToolboxWrapper />;
  return (
    <ToolboxWrapper>
      {tools.map(tool => (
        <Panel
          key={_.identity('tool')}
          title={tool.title}
          collapse
          tools={tool.items}
          description={tool.description}
        />
      ))}
    </ToolboxWrapper>
  );
}
