// @flow
import React from 'react';

type Props = {
  text: string,
  value: string,
  change: Function
};

export default function PropertyTableRow({ text, value, change }: Props) {
  return (
    <tr>
      <td>{text}</td>
      <td>
        <input
          type="text"
          value={value}
          onChange={change}
          className="p-1 text-center bg-grey-light rounded w-1/2 outline-none"
        />
      </td>
    </tr>
  );
}
