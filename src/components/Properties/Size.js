import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { convertToCm, convertToPx } from '../../helpers/Dimensions';
import { changeProperties } from '../../redux/actions';

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
      <div className="rounded-lg border border-grey-light bg-white mb-5 w-full">
        <h4 className="m-1 collapse-handler p-3 font-medium  bg-white">
          {this.props.t('size.title')}
        </h4>
        <div className="pl-5 p-2 bg-grey-lightest w-full text-grey-dark border-b border-grey-light text-sm outline-none">
          <table className="w-full table-auto table-fixed text-center text-sm">
            <tbody>
              <tr>
                <td> {this.props.t('size.width')} </td>
                <td>
                  <input
                    type="text"
                    value={convertToCm(this.props.w)}
                    name="w"
                    onChange={this.handleChange}
                    className="p-1 text-center bg-grey-light rounded w-1/2 outline-none"
                  />
                </td>
              </tr>
              <tr>
                <td> {this.props.t('size.height')} </td>
                <td>
                  <input
                    type="text"
                    value={convertToCm(this.props.h)}
                    name="h"
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
