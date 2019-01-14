import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function DraggableRemoveHandler(props) {
  return (
    <div className="removeElement">
      <button
        onClick={props.click}
        className="outline-none p-1 rounded bg-grey-light"
        type="button"
      >
        <FontAwesomeIcon color="#333" icon="trash" />
      </button>
    </div>
  );
}
