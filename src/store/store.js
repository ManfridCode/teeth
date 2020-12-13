import { createStore } from 'redux'

const SET_JSON = 'SET_JSON';

const InitialState = {
    model: null,
    json: null
}

export const actionsState = {
    setJson:(value)=>{
        return {type:SET_JSON,value}
    }
};

const reducer = (state = InitialState, action)=>{
    console.log(action);
  switch (action.type) {
    case 'SET_MODEL':
      return {...state, model:action.model}
    case 'SET_JSON':
        return {...state, json:action.value}
    default:
      return state
  }
}

const store = createStore(reducer);


export default store;