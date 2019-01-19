// @flow
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  click: Function
};

export default function DraggableRemoveHandler({ click }: Props) {
  return (
    <div className="removeElement">
      <button onClick={click} className="outline-none p-1 rounded bg-grey-light" type="button">
        <FontAwesomeIcon color="#333" icon="trash" />
      </button>
    </div>
  );
}
