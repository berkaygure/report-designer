// @flow
import * as React from 'react';

type Props = {
  properties: {},
  activeElement: {
    properties: {
      size: { height?: number, width?: number },
      location: { x?: number, y?: number }
    }
  }
};

const AvailableProperties = {
  size: import('./Properties/Size.js'),
  alignment: import('./Properties/Alignment.js'),
  location: import('./Properties/Location.js')
};

type PropertiesWrapperTypes = {
  children?: React.Node
};

const PropertiesWrapper = (props: PropertiesWrapperTypes) => {
  const { children } = props;
  return <div className="bg-grey-lightest shadow p-5 w-1/3">{children}</div>;
};

const Properties = (props: Props) => {
  const { properties } = props;
  if (!properties) return <PropertiesWrapper />;
  return (
    <PropertiesWrapper>
      <React.Suspense fallback={<div>Loading...</div>}>
        {Object.keys(properties).map(propertyName => {
          if (!Object.prototype.hasOwnProperty.call(AvailableProperties, propertyName)) {
            return null;
          }
          const DynamicProperty = React.lazy(() => AvailableProperties[propertyName]);
          return <DynamicProperty {...properties[propertyName]} />;
        })}
      </React.Suspense>
    </PropertiesWrapper>
  );
};

export default Properties;
