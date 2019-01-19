// @flow
import * as React from 'react';

type Props = {
  children: React.Node
};

export default function Property({ children }: Props) {
  return <div className="rounded-lg border border-grey-light bg-white mb-5 w-full">{children}</div>;
}
