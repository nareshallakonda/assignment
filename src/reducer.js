const PERCEL_LOGGED_DATA = "percelloggeddata";
const USER_TOKEN = "userToken";
const USER_LOGOUT = "userLogOut";
const USER_CONFIG = "userConfig";
const SCREEN_INDEX_POSITION = "screenIndexPosition";

const initialState = {
percelloggedData:{
senderInformation:{},
recerverInformation:{},
weightInformation:[],
bookingSummary:{},
// paymentTransaction:{}
},
userToken:null,
userConfig:null,
screenIndexPosition:0
}

const screenIndexPosition = (payload) => {
  return {
    type: SCREEN_INDEX_POSITION,
    payload
  };
};
const percelLoggedData = (payload) => {
  return {
    type: PERCEL_LOGGED_DATA,
    payload
  };
};
const userToken = (payload) => {
  return {
    type: USER_TOKEN,
    payload
  };
};
const userLogOut = (payload) => {
  return {
    type: USER_LOGOUT,
    payload
  };
};

const userConfig = (payload) => {
  return {
    type: USER_CONFIG,
    payload
  };
};
export default function authReducer(state = initialState,action){
  switch(action.type){
      case PERCEL_LOGGED_DATA:
      return {...state, percelloggedData:action.payload};
      case USER_TOKEN:
      return {...state, userToken:action.payload};
      case USER_LOGOUT:
      return {...state, userToken:action.payload};
      case USER_CONFIG:
      return {...state, userConfig:action.payload};
      case SCREEN_INDEX_POSITION:
      return {...state, screenIndexPosition:action.payload};
      default:
      return state;
  }
}
export {percelLoggedData, userToken, userLogOut,userConfig,screenIndexPosition};