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
  w: number,
  h: number
};

class Size extends Component<Props> {
  handleChange = event => {
    // eslint-disable-next-line no-shadow
    const { changeProperties, w, h } = this.props;
    const width = event.target.name === 'w' ? convertToPx(event.target.value) : w;
    const height = event.target.name === 'h' ? convertToPx(event.target.value) : h;

    changeProperties({
      size: {
        w: width,
        h: height
      }
    });
  };

  render() {
    const { t, w, h } = this.props;
    return (
      <Property>
        <PropertyHeader title={t('size.title')} />
        <PropertyBody>
          <PropertyTable>
            <PropertyTableRow
              text={t('size.width')}
              value={convertToCm(w)}
              change={this.handleChange}
            />
            <PropertyTableRow
              text={t('size.width')}
              value={convertToCm(h)}
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
  )(Size)
);
