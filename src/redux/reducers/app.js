import { INITIALIZE_APP, ADD_TO_SCENE } from '../actions/types';

const INITIAL_STATE = {
  tools: [],
  objects: [
    {
      obj: 1
    }
  ]
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
        objects: [
          ...state.objects,
          {
            ...action.payload
          }
        ]
      };
    default:
      return state;
  }
};
