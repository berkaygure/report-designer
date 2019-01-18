import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { changeProperties } from '../../redux/actions';
import { Property, PropertyHeader, PropertyBody } from './Property';

class Alignment extends Component {
  changeAlignment = alignment => {
    this.props.changeProperties({
      alignment
    });
  };

  isAlignmentEqualTo = eq => this.props.alignment === eq;

  render() {
    return (
      <Property>
        <PropertyHeader title={this.props.t('alignment.title')} />
        <PropertyBody>
          <div className="flex justify-center">
            <button
              onClick={() => this.changeAlignment('left')}
              className={`${
                this.isAlignmentEqualTo('left') ? 'bg-blue' : 'bg-grey'
              } p-2 mr-1 text-white rounded w-1/3`}
              type="button"
            >
              <FontAwesomeIcon icon="align-left" />
            </button>
            <button
              onClick={() => this.changeAlignment('center')}
              className={`${
                this.isAlignmentEqualTo('center') ? 'bg-blue' : 'bg-grey'
              }  p-2 mr-1 text-white rounded w-1/3`}
              type="button"
            >
              <FontAwesomeIcon icon="align-center" />
            </button>
            <button
              onClick={() => this.changeAlignment('right')}
              className={`${
                this.isAlignmentEqualTo('right') ? 'bg-blue' : 'bg-grey'
              }  p-2 mr-1 text-white rounded w-1/3`}
              type="button"
            >
              <FontAwesomeIcon icon="align-right" />
            </button>
          </div>
        </PropertyBody>
      </Property>
    );
  }
}

const mapStateToProps = state => {
  return {
    alignment: state.appReducers.activeElement
      ? state.appReducers.activeElement.properties.alignment
      : ''
  };
};

export default withNamespaces()(
  connect(
    mapStateToProps,
    { changeProperties }
  )(Alignment)
);
