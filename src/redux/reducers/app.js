import {
  INITIALIZE_APP,
  ADD_TO_SCENE,
  MAKE_ELEMENT_ACTIVE,
  CHANGE_PROPERTIES,
  DROP_ELEMENT
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

    case DROP_ELEMENT: {
      const objects = Object.keys(state.objects)
        .filter(key => key !== action.payload)
        .reduce((obj, key) => {
          obj[key] = state.objects[key];
          return obj;
        }, {});

      return {
        ...state,
        objects,
        activeElement: null
      };
    }

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
    case CHANGE_PROPERTIES: {
      if (!state.activeElement) return state;

      const activeElement = state.objects[state.activeElement.id];

      if (!activeElement) return state;

      const newActiveElement = {
        ...activeElement,
        properties: {
          ...activeElement.properties,
          ...action.payload
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
