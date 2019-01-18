import React from 'react';

export default function PropertyTable(props) {
  return (
    <table className="w-full table-auto table-fixed text-center text-sm">
      <tbody>{props.children}</tbody>
    </table>
  );
}
