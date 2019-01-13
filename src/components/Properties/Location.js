import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { convertToCm, convertToPx } from '../../helpers/Dimensions';
import { changeLocation } from '../../redux/actions';

class Location extends Component {
  handleChange = event => {
    const x = event.target.name === 'x' ? convertToPx(event.target.value) : this.props.x;
    const y = event.target.name === 'y' ? convertToPx(event.target.value) : this.props.y;

    this.props.changeLocation({
      x,
      y
    });
  };

  render() {
    return (
      <div className="rounded-lg border border-grey-light bg-white mb-5 w-full">
        <h4 className="m-1 collapse-handler p-3 font-medium  bg-white">
          {this.props.t('location.title')}
        </h4>
        <div className="pl-5 p-2 bg-grey-lightest w-full text-grey-dark border-b border-grey-light text-sm outline-none">
          <table className="w-full table-auto table-fixed text-center text-sm">
            <tbody>
              <tr>
                <td> {this.props.t('location.left')} </td>
                <td>
                  <input
                    type="text"
                    value={convertToCm(this.props.x)}
                    name="x"
                    onChange={this.handleChange}
                    className="p-1 text-center bg-grey-light rounded w-1/2 outline-none"
                  />
                </td>
              </tr>
              <tr>
                <td> {this.props.t('location.top')} </td>
                <td>
                  <input
                    type="text"
                    value={convertToCm(this.props.y)}
                    name="y"
                    onChange={this.handleChange}
                    className="p-1 text-center bg-grey-light rounded w-1/2 outline-none"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Location.propTypes = {
  activeElement: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number
};

const mapStateToProps = state => {
  return {
    activeElement: state.appReducers.activeElement
  };
};

export default withNamespaces()(
  connect(
    mapStateToProps,
    { changeLocation }
  )(Location)
);
