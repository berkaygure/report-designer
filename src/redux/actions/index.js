import {
  ACTIVE_ITEM,
  ADD_ITEM,
  RE_POSITION,
  REMOVE_ITEM,
  CREATE_PAGE,
  CHANGE_COLUMN,
  UPDATE_COLUMN_ORDER,
  SET_PROPERTY,
  INIT_APP,
  CHANGE_BG,
  PREVIEW,
  SAVE,
  NEW_MODAL
} from "./types";

export const activeElements = id => {
  return {
    type: ACTIVE_ITEM,
    payload: id
  };
};
export const addItem = item => {
  return {
    type: ADD_ITEM,
    payload: item
  };
};

export const changePostion = element => {
  return {
    type: RE_POSITION,
    payload: element
  };
};

export const removeItem = item => {
  return {
    type: REMOVE_ITEM,
    payload: item
  };
};

export const createPage = page => {
  return {
    type: CREATE_PAGE,
    payload: page
  };
};
export const changeColumn = column => {
  return {
    type: CHANGE_COLUMN,
    payload: column
  };
};

export const updateColumnOrder = column => {
  return {
    type: UPDATE_COLUMN_ORDER,
    payload: column
  };
};

export const setProperty = elem => {
  return {
    type: SET_PROPERTY,
    payload: elem
  };
};

export const initApp = app => {
  return {
    type: INIT_APP,
    payload: app
  };
};

export const changeBg = bg => {
  return {
    type: CHANGE_BG,
    payload: bg
  };
};

export const previewModal = status => {
  return {
    type: PREVIEW,
    payload: status
  };
};

export const newModal = status => {
  return {
    type: NEW_MODAL,
    payload: status
  };
};

export const saveState = save => {
  return {
    type: SAVE,
    payload: save
  };
};
