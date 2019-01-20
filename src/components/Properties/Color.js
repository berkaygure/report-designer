// @flow
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { changeProperties } from '../../redux/actions';
import {
  Property,
  PropertyHeader,
  PropertyBody,
  PropertyTable,
  PropertyTableRow
} from './Property';
import Colorpicker from '../Colorpicker';

type Props = {
  changeProperties: (object: {}) => {},
  t: (key: string) => string,
  color: string,
  backgroundColor: string,
  activeElement: {}
};
class Color extends Component<Props> {
  changeTextColor = (color, event) => {
    // eslint-disable-next-line no-shadow
    const { changeProperties, activeElement } = this.props;
    changeProperties({
      color: {
        ...activeElement.properties.color,
        color: color.hex
      }
    });
  };

  changeBgColor = (clr, event) => {
    // eslint-disable-next-line no-shadow
    const { changeProperties, activeElement } = this.props;
    changeProperties({
      color: {
        ...activeElement.properties.color,
        backgroundColor: clr.hex
      }
    });
  };

  render() {
    const { t, color, backgroundColor } = this.props;

    return (
      <Property>
        <PropertyHeader title={t('color.title')} />
        <PropertyBody>
          <PropertyTable>
            <PropertyTableRow
              text={t('color.text')}
              component={<Colorpicker onChangeCompleted={this.changeTextColor} color={color} />}
            />
            <PropertyTableRow
              text={t('color.background')}
              component={
                <Colorpicker color={backgroundColor} onChangeCompleted={this.changeBgColor} />
              }
            />
          </PropertyTable>
        </PropertyBody>
      </Property>
    );
  }
}

const mapStateToProp = state => ({
  ...state,
  activeElement: state.appReducers.activeElement
});

export default withNamespaces()(
  connect(
    mapStateToProp,
    { changeProperties }
  )(Color)
);
