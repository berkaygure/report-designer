// @flow
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { changeProperties } from '../../redux/actions';
import { Property, PropertyHeader, PropertyBody } from './Property';

type Props = {
  changeProperties: (object: {}) => {},
  t: (key: string) => string,
  alignment: string
};

type AlignmentButtonProps = {
  onClick: Function,
  selected: boolean,
  icon: string
};

const AlignmentButton = (props: AlignmentButtonProps) => {
  const { onClick, selected, icon } = props;
  return (
    <button
      onClick={onClick}
      className={`${selected ? 'bg-blue' : 'bg-grey'} p-2 mr-1 text-white rounded w-1/3`}
      type="button"
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

class Alignment extends Component<Props> {
  changeAlignment = alignment => {
    // eslint-disable-next-line no-shadow
    const { changeProperties } = this.props;
    changeProperties({
      alignment
    });
  };

  // eslint-disable-next-line react/destructuring-assignment
  isAlignmentEqualTo = eq => this.props.alignment === eq;

  render() {
    const { t } = this.props;
    return (
      <Property>
        <PropertyHeader title={t('alignment.title')} />
        <PropertyBody>
          <div className="flex justify-center">
            <AlignmentButton
              icon="align-left"
              selected={this.isAlignmentEqualTo('left')}
              onClick={() => this.changeAlignment('left')}
            />
            <AlignmentButton
              icon="align-center"
              selected={this.isAlignmentEqualTo('center')}
              onClick={() => this.changeAlignment('center')}
            />
            <AlignmentButton
              icon="align-right"
              selected={this.isAlignmentEqualTo('right')}
              onClick={() => this.changeAlignment('right')}
            />
          </div>
        </PropertyBody>
      </Property>
    );
  }
}

const mapStateToProps = state => ({
  alignment: state.appReducers.activeElement
    ? state.appReducers.activeElement.properties.alignment
    : ''
});

export default withNamespaces()(
  connect(
    mapStateToProps,
    { changeProperties }
  )(Alignment)
);
