import { types } from '../actions';
const {
  FETCH_COMMIT_LIST_REQUEST,
  FETCH_COMMIT_LIST_SUCCESS,
  FETCH_COMMIT_LIST_FAILURE,
} = types;

const initState = {
  status: 'init',
};

export default function fetch(state = initState, {type, payload}) {
  switch (type) {
  case FETCH_COMMIT_LIST_REQUEST:
    return Object.assign({}, state, {
      status: 'request',
    });
  case FETCH_COMMIT_LIST_SUCCESS:
    return Object.assign({}, state, {
      status: 'success',
    });
  case FETCH_COMMIT_LIST_FAILURE:
    return Object.assign({}, state, {
      status: 'failure',
    });
  default:
    return state;
  }
}
