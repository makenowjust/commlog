import { types } from '../actions';
const {
  FETCH_COMMIT_LIST_SUCCESS,
  APPEND_COMMIT_LIST_SUCCESS,
} = types;

const initState = [];

export default function commitList(state = initState, {type, payload}) {
  switch (type) {
  case FETCH_COMMIT_LIST_SUCCESS:
    return payload.commitList;
  case APPEND_COMMIT_LIST_SUCCESS:
    return state.concat(payload.commitList);
  default:
    return state;
  }
}
