import {
  ADD_ITEM, CHANGE_COLUMN, CREATE_PAGE, INIT_APP, NEW_MODAL, PREVIEW, RE_POSITION, REMOVE_ITEM, SAVE, SET_PROPERTY,
  UPDATE_COLUMN_ORDER
} from "../actions/types";

const INITIAL_STATE = {
  app: null,
  previewModal : false,
  save: true,
  newModal: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type){
    case INIT_APP:
      return {
        app: action.payload.app
      };
    case PREVIEW:
      return {
        ...state,
        previewModal: action.payload
      };
    case NEW_MODAL:
      return {
        ...state,
        newModal: action.payload
      };
    case ADD_ITEM:
    case RE_POSITION:
    case REMOVE_ITEM:
    case CREATE_PAGE:
    case CHANGE_COLUMN:
    case UPDATE_COLUMN_ORDER:
    case SET_PROPERTY:
      return {
        ...state,
        save: false,
      };
    case SAVE:{
      return {
        ...state,
        save: action.payload,
      };
    }
    default:
      return state;
  }
}