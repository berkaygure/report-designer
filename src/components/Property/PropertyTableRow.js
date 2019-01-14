import React from 'react';

export default function PropertyTableRow(props) {
  return (
    <tr>
      <td> {props.text} </td>
      <td>
        <input
          type="text"
          value={props.value}
          name="x"
          onChange={props.onChange}
          className="p-1 text-center bg-grey-light rounded w-1/2 outline-none"
        />
      </td>
    </tr>
  );
}
