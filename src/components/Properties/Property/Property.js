import React from 'react';

export default function Property(props) {
  return (
    <div className="rounded-lg border border-grey-light bg-white mb-5 w-full">{props.children}</div>
  );
}
