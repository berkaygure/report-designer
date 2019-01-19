// @flow
import React from 'react';

type Props = {
  title: string
};

export default function PropertyHeader({ title }: Props) {
  return <h4 className="m-1 collapse-handler p-3 font-medium  bg-white">{title}</h4>;
}
