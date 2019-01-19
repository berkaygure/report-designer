// @flow
import * as React from 'react';

type Props = {
  children: React.Node
};

export default function PropertyBody({ children }: Props) {
  return (
    <div className="pl-5 p-2 bg-grey-lightest w-full text-grey-dark border-b border-grey-light text-sm outline-none">
      {children}
    </div>
  );
}
