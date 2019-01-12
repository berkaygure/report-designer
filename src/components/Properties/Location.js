import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProperties } from '../../redux/actions';
import { convertToCm, convertToPx } from '../../helpers/Dimensions';

class Location extends Component {
  state = { x: 0, y: 0 };

  componentWillReceiveProps() {
    this.setState({
      x: convertToCm(this.props.x),
      y: convertToCm(this.props.y)
    });
  }

  handleChange = event => {
    this.setState(
      {
        [event.target.name]: convertToPx(event.target.value)
      },
      () => {
        this.props.updateProperties('location', this.state);
      }
    );
  };

  render() {
    return (
      <div className="rounded-lg border border-grey-light bg-white mb-5 w-full">
        <h4 className="m-1 collapse-handler p-3 font-medium  bg-white">
          {this.props.t('location.title')}
        </h4>
        <div className="pl-5 p-2 bg-grey-lightest w-full text-grey-dark border-b border-grey-light text-sm outline-none">
          <table className="w-full table-auto table-fixed text-center text-sm">
            <tr>
              <td> {this.props.t('location.left')} </td>
              <td>
                <input
                  type="text"
                  value={this.state.x}
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
                  value={this.state.y}
                  name="y"
                  onChange={this.handleChange}
                  className="p-1 text-center bg-grey-light rounded w-1/2 outline-none"
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

Location.propTypes = {
  activeElement: PropTypes.object,
  updateProperties: PropTypes.func,
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
    {
      updateProperties
    }
  )(Location)
);
