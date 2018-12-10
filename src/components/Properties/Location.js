import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';

class Location extends Component {
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
                  className="p-1 text-center bg-grey-light rounded w-1/2 outline-none"
                />
              </td>
            </tr>
            <tr>
              <td> {this.props.t('location.top')} </td>
              <td>
                <input
                  type="text"
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

export default withNamespaces()(Location);
