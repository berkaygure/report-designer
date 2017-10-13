import {ACTIVE_ITEM, RE_POSITION, SET_PROPERTY, UPDATE_COLUMN_ORDER} from '../actions/types';

const INITIAL_STATE = {
  element: {
    id: -1,
    x: 0,
    y: 0,
    properties:{

    }
  },
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIVE_ITEM:
      return {
        element: action.payload,
      };
    case RE_POSITION:
      return {
        element: {
          ...state.element,
          x: action.payload.x,
          y: action.payload.y,
          w: action.payload.w,
          h: action.payload.h,
        },
      };
    case SET_PROPERTY:
      return {
        element: {
          ...state.element,
          properties: action.payload.properties,
        },
      };
    case UPDATE_COLUMN_ORDER:
      return {
        element: {
          ...state.element,
          columns: state.element.columns.map(
            col =>
              action.payload.find(x => x.id === col.id)
                ? { ...col, ...action.payload.find(x => x.id === col.id) }
                : col,
          ),
        },
      };
    default:
      return state;
  }
};
