import React, { Component } from 'react';
import Location from './Properties/Location';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PropertiesPanel extends Component {
  render() {
    return (
      <div className="bg-grey-lightest shadow p-5 w-1/3">
        {this.props.properties &&
          Object.keys(this.props.properties).map(propertyName => {
            switch (propertyName) {
              case 'location': {
                const { x, y } = this.props.activeElement.properties.location;
                return <Location x={ x } y={ y } />;
              }
              default:
                return null;
            }
          })}
      </div>
    );
  }
}

PropertiesPanel.propTypes = {
  properties: PropTypes.object,
  activeElement: PropTypes.object
};

const mapStateToProps = state => {
  return {
    activeElement: state.appReducers.activeElement
  };
};

export default connect(
  mapStateToProps,
  {}
)(PropertiesPanel);
