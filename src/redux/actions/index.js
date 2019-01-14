import axios from 'axios';
import {
  INITIALIZE_APP,
  ADD_TO_SCENE,
  MAKE_ELEMENT_ACTIVE,
  CHANGE_PROPERTIES,
  DROP_ELEMENT
} from './types';

/**
 * Apply loaded settings to application
 *
 * @param {object} settings
 */
export const initializeApp = settings => ({
  type: INITIALIZE_APP,
  payload: settings
});

/**
 * Loads settings from a JSON
 */
export const loadSettings = () => async dispatch => {
  const res = await axios.get('./settings.json');
  const data = await res.data;
  dispatch(initializeApp(data));
};

/**
 * Adds dropped element to scene
 *
 * @param {object} object
 */
export const addToScene = (id, object) => ({
  type: ADD_TO_SCENE,
  payload: {
    id,
    object
  }
});

/**
 * Makes active to clicked element and disable others.
 *
 * @param {string} elementId
 */
export const makeElementActive = elementId => ({
  type: MAKE_ELEMENT_ACTIVE,
  payload: elementId
});

/**
 * Updates selected elements location.
 *
 * @param {string} elementId
 * @param {object} props
 */
export const changeProperties = location => ({
  type: CHANGE_PROPERTIES,
  payload: location
});

/**
 * Updates selected elements location.
 *
 * @param {string} elementId
 * @param {object} props
 */
export const dropElement = elementId => ({
  type: DROP_ELEMENT,
  payload: elementId
});
