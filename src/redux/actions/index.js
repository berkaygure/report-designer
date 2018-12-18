import {
  INITIALIZE_APP,
  ADD_TO_SCENE,
  MAKE_ELEMENT_ACTIVE,
  UPDATE_PROPERTIES
} from './types';
import axios from 'axios';

/**
 * Applys loaded settings to application
 *
 * @param {object} settings
 */
export const initializeApp = settings => {
  return {
    type: INITIALIZE_APP,
    payload: settings
  };
};

/**
 * Loads settins from a JSON
 */
export const loadSettings = () => {
  return async dispatch => {
    try {
      const res = await axios.get('./settings.json');
      const data = await res.data;
      dispatch(initializeApp(data));
    } catch (e) {}
  };
};

/**
 * Adds dropped element to scene
 *
 * @param {object} object
 */
export const addToScene = object => {
  return {
    type: ADD_TO_SCENE,
    payload: object
  };
};

/**
 * Makes active to clicked element and disable others.
 *
 * @param {string} elementId
 */
export const makeElementActive = elementId => {
  return {
    type: MAKE_ELEMENT_ACTIVE,
    payload: elementId
  };
};

/**
 * Updates elements properties.
 *
 * @param {string} elementId
 * @param {object} props
 */
export const updateProperties = (propertyName, props) => {
  return {
    type: UPDATE_PROPERTIES,
    payload: {
      propertyName: propertyName,
      properties: props
    }
  };
};
