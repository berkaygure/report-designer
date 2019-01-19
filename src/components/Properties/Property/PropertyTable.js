// @flow
import * as React from 'react';

type Props = {
  children: React.Node
};

export default function PropertyTable({ children }: Props) {
  return (
    <table className="w-full table-auto table-fixed text-center text-sm">
      <tbody>{children}</tbody>
    </table>
  );
}
