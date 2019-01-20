// @flow
import * as React from 'react';

type Props = {
  text: string,
  value: string,
  change: Function,
  component?: React.Element<any> | null
};

export default function PropertyTableRow({ text, value, change, component }: Props) {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {component || (
          <input
            type="text"
            value={value}
            onChange={change}
            className="p-1 text-center bg-grey-light rounded w-1/2 outline-none"
          />
        )}
      </td>
    </tr>
  );
}

PropertyTableRow.defaultProps = {
  component: null
};
