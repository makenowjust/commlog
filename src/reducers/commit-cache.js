import { types } from '../actions';
const {
  FETCH_COMMIT_SUCCESS,
  FETCH_COMMIT_LIST_SUCCESS,
  APPEND_COMMIT_LIST_SUCCESS,
} = types;

const initState = {};

export default function commitCache(state = initState, {type, payload}) {
  switch (type) {
  case FETCH_COMMIT_SUCCESS:
    return Object.assign({}, state, {
      [payload.sha]: payload.commit,
    });
  case FETCH_COMMIT_LIST_SUCCESS:
  case APPEND_COMMIT_LIST_SUCCESS:
    return Object.assign({}, state, payload.commitList.reduce((nextState, commit) => {
      nextState[commit.sha] = commit;
      return nextState;
    }, {}));
  default:
    return state;
  }
}
