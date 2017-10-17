import {CHANGE_BG, INIT_APP} from "../actions/types";

const INITIAL_STATE = {
  w: 0,
  h: 0,
  orientation: "v",
  paper_template : 'a4', //a4 a5 gibi
  tmpBg: '#fff'
};
export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case INIT_APP:
     return {
       ...state,
       ...action.payload.app.pageConfig.size,
       orientation: action.payload.app.pageConfig.orientation,
       count: action.payload.app.pageConfig.pageCount,
       paper_template: action.payload.app.pageConfig.page,
     };
     case CHANGE_BG:
      return {
        ...state,
        tmpBg: action.payload.tmpBg
      };
    default:
      return state;
  }
}