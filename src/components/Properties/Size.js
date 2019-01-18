import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { convertToCm, convertToPx } from '../../helpers/Dimensions';
import { changeProperties } from '../../redux/actions';
import {
  Property,
  PropertyHeader,
  PropertyBody,
  PropertyTable,
  PropertyTableRow
} from './Property';

class Size extends Component {
  handleChange = event => {
    const width = event.target.name === 'w' ? convertToPx(event.target.value) : this.props.w;
    const height = event.target.name === 'h' ? convertToPx(event.target.value) : this.props.h;

    this.props.changeProperties({
      size: {
        width,
        height
      }
    });
  };

  render() {
    return (
      <Property>
        <PropertyHeader title={this.props.t('size.title')} />
        <PropertyBody>
          <PropertyTable>
            <PropertyTableRow
              text={this.props.t('size.width')}
              value={convertToCm(this.props.w)}
              change={this.handleChange}
            />
            <PropertyTableRow
              text={this.props.t('size.width')}
              value={convertToCm(this.props.w)}
              change={this.handleChange}
            />
          </PropertyTable>
        </PropertyBody>
      </Property>
    );
  }
}

Location.propTypes = {
  w: PropTypes.number,
  h: PropTypes.number
};

const mapStateToProps = state => {
  return {};
};

export default withNamespaces()(
  connect(
    mapStateToProps,
    { changeProperties }
  )(Size)
);
