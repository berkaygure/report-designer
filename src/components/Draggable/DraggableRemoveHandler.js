import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function DraggableRemoveHandler() {
  return (
    <div className="removeElement">
      <button className="outline-none p-1 rounded bg-grey-light" type="button">
        <FontAwesomeIcon color="#333" icon="trash" />
      </button>
    </div>
  );
}
