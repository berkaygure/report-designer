import {
  ADD_ITEM,
  RE_POSITION,
  REMOVE_ITEM,
  CREATE_PAGE,
  CHANGE_COLUMN,
  UPDATE_COLUMN_ORDER,
  SET_PROPERTY, INIT_APP,
} from '../actions/types';

const INITIAL_STATE = {
  elements: [],
  tableDropped: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ITEM:
      if (!state.tableDropped && action.payload.element_type === 'table') {
        state.tableDropped = true;
      }
      return {
        ...state,
        elements: [...state.elements, action.payload],
      };
    case RE_POSITION: {
      const foundIndex = state.elements.findIndex(x => x.id === action.payload.id);
      state.elements[foundIndex].x = action.payload.x;
      state.elements[foundIndex].y = action.payload.y;
      state.elements[foundIndex].h = action.payload.h;
      state.elements[foundIndex].w = action.payload.w;
      return state;
    }

    case REMOVE_ITEM:
      if (state.tableDropped && action.payload.element_type === 'table') {
        state.tableDropped = false;
      }
      return {
        ...state,
        elements: state.elements.filter(element => element !== action.payload),
      };
    case CREATE_PAGE:

      return {
        ...state,
        page: action.payload,
      };
    case CHANGE_COLUMN: {
      const table = state.elements.find(x => x.element_type === 'table');
      const column = table.columns.find(x => x.id === action.payload.id);
      return {
        ...state,
        elements: [
          ...state.elements.filter(x => x.element_type !== 'table'),
          {
            ...table,
            columns: [
              ...table.columns.filter(c => c.id !== action.payload.id),
              {
                ...column,
                ...action.payload.column,
              },
            ],
          },
        ],
      };
    }
    case UPDATE_COLUMN_ORDER: {
      const table = state.elements.find(x => x.element_type === 'table');

      return {
        ...state,
        elements: [
          ...state.elements.filter(x => x.element_type !== 'table'),
          {
            ...table,
            columns: table.columns.map(
              col =>
                action.payload.find(x => x.id === col.id)
                  ? { ...col, ...action.payload.find(x => x.id === col.id) }
                  : col,
            ),
          },
        ],
      };
    }
    case SET_PROPERTY: {
      const foundIndex = state.elements.findIndex(x => x.id === action.payload.id);
      state.elements[foundIndex].properties = action.payload.properties;
      return state;
    }
    case INIT_APP:
      return {
        elements: action.payload.app.design.elements,
        tableDropped: action.payload.app.design.tableDropped,

      }
    default:
      return state;
  }
};
