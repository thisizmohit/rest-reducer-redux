import { defaultState } from './defaults';
import { get, getSuccess, getFailure } from './verbs/get';
import { getAll, getAllSuccess } from './verbs/getAll';
import { post, postSuccess } from './verbs/post';
import { put, putSuccess, putFailure } from './verbs/put';
import { remove, removeSuccess, removeFailure } from './verbs/delete';

export default function reducer({
  GET, GET_SUCCESS, GET_FAILURE,
  GET_ALL, GET_ALL_SUCCESS,
  POST, POST_SUCCESS,
  PUT, PUT_SUCCESS, PUT_FAILURE,
  DELETE, DELETE_SUCCESS, DELETE_FAILURE,
}, initialState = defaultState, customReducer) {
  let iState = initialState;
  let cReducer = customReducer;

  // initialState should be either function or object
  // if it's function it will be used as customReducer
  // and initialState with defaultState

  if (typeof iState === 'function') {
    cReducer = initialState;
    iState = defaultState;
  } else if (typeof iState !== 'object') {
    // throw error;
  }

  // type is an action string
  // payload is data passed with action
  return (state = iState, { type, payload }) => {
    switch (type) {
      case GET:
        return get(state, payload);
      case GET_SUCCESS:
        return getSuccess(state, payload);
      case GET_FAILURE:
        return getFailure(state, payload);
      case GET_ALL:
        return getAll(state, payload);
      case GET_ALL_SUCCESS:
        return getAllSuccess(state, payload);
      case POST:
        return post(state, payload);
      case POST_SUCCESS:
        return postSuccess(state, payload);
      case PUT:
        return put(state, payload);
      case PUT_SUCCESS:
        return putSuccess(state, payload);
      case PUT_FAILURE:
        return putFailure(state, payload);
      case DELETE:
        return remove(state, payload);
      case DELETE_SUCCESS:
        return removeSuccess(state, payload);
      case DELETE_FAILURE:
        return removeFailure(state, payload);
      default:
        return cReducer ? cReducer(state, { type, payload }) : state;
    }
  };
}