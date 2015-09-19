import { types } from '../actions';
const {
  APPEND_COMMIT_LIST_REQUEST,
  APPEND_COMMIT_LIST_SUCCESS,
  APPEND_COMMIT_LIST_FAILURE,
} = types;

const initState = {
  status: 'success',
  finish: false,
};

export default function append(state = initState, {type, payload}) {
  switch (type) {
  case APPEND_COMMIT_LIST_REQUEST:
    return Object.assign({}, state, {
      status: 'request',
    });
  case APPEND_COMMIT_LIST_SUCCESS:
    return Object.assign({}, state, {
      status: 'success',
      finish: payload.commitList.length === 0,
    });
  case APPEND_COMMIT_LIST_FAILURE:
    return Object.assign({}, state, {
      status: 'failure',
    });
  default:
    return state;
  }
}
