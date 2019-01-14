import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { convertToCm, convertToPx } from '../../helpers/Dimensions';
import { changeProperties } from '../../redux/actions';
import Property from '../Property/Property';
import PropertyHeader from '../Property/PropertyHeader';
import PropertyBody from '../Property/PropertyBody';
import PropertyTable from '../Property/PropertyTable';
import PropertyTableRow from '../Property/PropertyTableRow';

class Location extends Component {
  handleChange = event => {
    const x = event.target.name === 'x' ? convertToPx(event.target.value) : this.props.x;
    const y = event.target.name === 'y' ? convertToPx(event.target.value) : this.props.y;

    this.props.changeProperties({
      location: {
        x,
        y
      }
    });
  };

  render() {
    return (
      <Property>
        <PropertyHeader title={this.props.t('location.title')} />
        <PropertyBody>
          <PropertyTable>
            <PropertyTableRow
              text={this.props.t('location.left')}
              value={convertToCm(this.props.x)}
              change={this.handleChange}
            />
            <PropertyTableRow
              text={this.props.t('location.top')}
              value={convertToCm(this.props.y)}
              change={this.handleChange}
            />
          </PropertyTable>
        </PropertyBody>
      </Property>
    );
  }
}

Location.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number
};

const mapStateToProps = state => {
  return {};
};

export default withNamespaces()(
  connect(
    mapStateToProps,
    { changeProperties }
  )(Location)
);
