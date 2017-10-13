import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ElementsReducer from './ElementsReducer';
import SelectionReducer from './SelectionReducer';
import ToolReducer from './ToolReducer';
import AppReducer from "./AppReducer";
import PaperReducer from "./PaperReducer";

export default combineReducers({
  router: routerReducer,
  elements: ElementsReducer,
  activeElement: SelectionReducer,
  tools: ToolReducer,
  application: AppReducer,
  paper: PaperReducer
});
