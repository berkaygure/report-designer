import React from 'react';
import { connect } from 'react-redux';
import Location from './Properties/Location';
import Size from './Properties/Size';

const PropertiesPanel = props => (
  <div className="bg-grey-lightest shadow p-5 w-1/3">
    {props.properties &&
      Object.keys(props.properties).map(propertyName => {
        switch (propertyName) {
          case 'location': {
            const { x, y } = props.activeElement.properties.location;
            return <Location key={propertyName} x={x} y={y} />;
          }
          case 'size': {
            const { width, height } = props.activeElement.properties.size;
            return <Size key={propertyName} w={width} h={height} />;
          }
          default:
            return null;
        }
      })}
  </div>
);

const mapStateToProps = state => ({
  activeElement: state.appReducers.activeElement
});

export default connect(
  mapStateToProps,
  {}
)(PropertiesPanel);
