// @flow
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
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

type Props = {
  changeProperties: (object: {}) => {},
  t: (key: string) => string,
  x: number,
  y: number
};

class Location extends Component<Props> {
  handleChange = event => {
    // eslint-disable-next-line no-shadow
    const { x, y, changeProperties } = this.props;
    const newX = event.target.name === 'x' ? convertToPx(event.target.value) : x;
    const newY = event.target.name === 'y' ? convertToPx(event.target.value) : y;

    changeProperties({
      location: {
        x: newX,
        y: newY
      }
    });
  };

  render() {
    const { x, y, t } = this.props;
    return (
      <Property>
        <PropertyHeader title={t('location.title')} />
        <PropertyBody>
          <PropertyTable>
            <PropertyTableRow
              text={t('location.left')}
              value={convertToCm(x)}
              change={this.handleChange}
            />
            <PropertyTableRow
              text={t('location.top')}
              value={convertToCm(y)}
              change={this.handleChange}
            />
          </PropertyTable>
        </PropertyBody>
      </Property>
    );
  }
}

export default withNamespaces()(
  connect(
    null,
    { changeProperties }
  )(Location)
);
