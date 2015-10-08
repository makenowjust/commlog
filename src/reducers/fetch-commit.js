import { types } from '../actions'

const {
  FETCH_COMMIT_REQUEST,
  FETCH_COMMIT_SUCCESS,
  FETCH_COMMIT_FAILURE
} = types

const initState = {
  status: 'init'
}

export default function fetch (state = initState, {type, payload}) {
  switch (type) {
    case FETCH_COMMIT_REQUEST:
      return Object.assign({}, state, {
        status: 'request'
      })
    case FETCH_COMMIT_SUCCESS:
      return Object.assign({}, state, {
        status: 'success'
      })
    case FETCH_COMMIT_FAILURE:
      return Object.assign({}, state, {
        status: 'failure'
      })
    default:
      return state
  }
}
