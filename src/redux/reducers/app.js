import {
  INITIALIZE_APP,
  ADD_TO_SCENE,
  MAKE_ELEMENT_ACTIVE,
  CHANGE_LOCATION
} from '../actions/types';

const INITIAL_STATE = {
  tools: [],
  objects: {},
  activeElement: null
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
        objects: { ...state.objects, [action.payload.id]: { ...action.payload.object } }
      };

    case MAKE_ELEMENT_ACTIVE: {
      const activeElement = state.objects[action.payload];

      if (!activeElement) {
        return {
          ...state,
          activeElement: null
        };
      }

      activeElement.id = action.payload;

      return {
        ...state,
        activeElement
      };
    }
    case CHANGE_LOCATION: {
      if (!state.activeElement) return state;

      const activeElement = state.objects[state.activeElement.id];

      if (!activeElement) return state;

      const newActiveElement = {
        ...activeElement,
        properties: {
          ...activeElement.properties,
          location: action.payload
        }
      };

      return {
        ...state,
        objects: {
          ...state.objects,
          [state.activeElement.id]: {
            ...newActiveElement
          }
        },
        activeElement: {
          id: state.activeElement.id,
          ...newActiveElement
        }
      };
    }

    default:
      return state;
  }
};
