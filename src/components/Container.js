// @flow
import React from 'react';
import Toolbox from './Toolbox';
import Editor from './Editor/Editor';
import { PropertiesPanel } from '.';

type Props = {
  tools: [],
  activeElement: { properties: {} }
};

export default function Container(props: Props) {
  const { tools, activeElement } = props;
  return (
    <div className="w-full flex flex-1 justify-between">
      <Toolbox tools={tools} />
      <div className="bg-grey-lightest  p-3 w-full overflow-y-scroll">
        <Editor width={672} height={950} />
      </div>
      <PropertiesPanel properties={activeElement ? activeElement.properties : null} />
    </div>
  );
}
