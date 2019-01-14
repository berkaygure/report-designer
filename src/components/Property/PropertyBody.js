import React from 'react';

export default function PropertyBody(props) {
  return (
    <div className="pl-5 p-2 bg-grey-lightest w-full text-grey-dark border-b border-grey-light text-sm outline-none">
      {props.children}
    </div>
  );
}
