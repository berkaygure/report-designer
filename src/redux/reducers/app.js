import {
  INITIALIZE_APP,
  ADD_TO_SCENE,
  MAKE_ELEMENT_ACTIVE
} from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {
  tools: [],
  objects: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INITIALIZE_APP:
      return {
        ...state,
        tools: action.payload.tools
      };

    case ADD_TO_SCENE:
      return {
        ...state,
        objects: [ ...state.objects, { ...action.payload } ]
      };

    case MAKE_ELEMENT_ACTIVE:
      return {
        ...state,
        activeElement: _.find(state.objects, [ 'id', action.payload ])
      };
    default:
      return state;
  }
};
