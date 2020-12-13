import { createStore } from 'redux'

const SET_JSON = 'SET_JSON';
const SET_GEOMETRY = 'SET_GEOMETRY';

const InitialState = {
    geometry: null,
    json: null
}

export const actionsState = {
    setJson:(value)=>{
        return {type:SET_JSON,value}
    },
    setGeometry:(value)=>{
        return {type:SET_GEOMETRY,value}
    }
};

const reducer = (state = InitialState, action)=>{
    console.log(action);
  switch (action.type) {
    case 'SET_GEOMETRY':
      return {...state, geometry:action.value}
    case 'SET_JSON':
        return {...state, json:action.value}
    default:
      return state
  }
}

const store = createStore(reducer);


export default store;