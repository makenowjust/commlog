import fetch from 'isomorphic-fetch'
import { API_ENTRY_POINT, REPO_NAME, REPO_BRANCH, OAUTH_TOKEN } from '../config'

export let types = {}
let actions = {}
function action (name, ...params) {
  let type = name.replace(/([A-Z])/g, '_$1').toUpperCase()
  types[type] = type
  actions[name] = (...values) => ({
    type,
    payload: params.reduce((payload, param, idx) => {
      payload[param] = values[idx]
      return payload
    }, {})
  })
}

function fetchWrapper (url) {
  return fetch(url, {
    method: 'get',
    headers: {
      'authorization': `token ${OAUTH_TOKEN}`
    }
  })
}

async function handleResponse (res) {
  if (res.status >= 400) {
    throw new Error(`Error in requesting GitHub API (${res.status}): ${(await res.json()).message}`)
  }
  return res.json()
}

action('fetchCommitRequest', 'sha')
action('fetchCommitSuccess', 'sha', 'commit')
action('fetchCommitFailure', 'sha', 'error')

function shouldFetchCommit (state, sha) {
  return !(state && sha in state.commitCache)
}

async function realFetchCommit (sha) {
  return handleResponse(await fetchWrapper(`${API_ENTRY_POINT}/repos/${REPO_NAME}/commits/${sha}`))
}

export function fetchCommit (sha) {
  return async (dispatch, getState) => {
    if (shouldFetchCommit(getState(), sha)) {
      dispatch(actions.fetchCommitRequest(sha))
      let commit
      try {
        commit = await realFetchCommit(sha)
      } catch (error) {
        dispatch(actions.fetchCommitFailure(sha, error))
        throw error
      }
      dispatch(actions.fetchCommitSuccess(sha, commit))
    }
  }
}

action('fetchCommitListRequest')
action('fetchCommitListSuccess', 'commitList')
action('fetchCommitListFailure', 'error')

function shouldFetchCommitList (state) {
  return !(state && state.commitList)
}

async function realFetchCommitList () {
  return handleResponse(await fetchWrapper(`${API_ENTRY_POINT}/repos/${REPO_NAME}/commits?sha=${encodeURIComponent(REPO_BRANCH)}`))
}

export function fetchCommitList () {
  return async (dispatch, getState) => {
    if (shouldFetchCommitList(getState())) {
      dispatch(actions.fetchCommitListRequest())
      let commitList
      try {
        commitList = await realFetchCommitList()
      } catch (error) {
        dispatch(actions.fetchCommitListFailure(error))
        throw error
      }
      dispatch(actions.fetchCommitListSuccess(commitList))
    }
  }
}

action('appendCommitListRequest')
action('appendCommitListSuccess', 'commitList')
action('appendCommitListFailure', 'error')

async function realAppendCommitList (until) {
  return handleResponse(await fetchWrapper(
    `${API_ENTRY_POINT}/repos/${REPO_NAME}/commits?sha=${encodeURIComponent(REPO_BRANCH)}&until=${encodeURIComponent(until)}`))
}

export function appendCommitList () {
  return async (dispatch, getState) => {
    dispatch(actions.appendCommitListRequest())
    const { commitList = [] } = getState() || {}
    const lastCommit = commitList[commitList.length - 1]
    let newCommitList
    try {
      newCommitList = await realAppendCommitList(lastCommit.commit.author.date)
    } catch (error) {
      dispatch(actions.appendCommitListFailure(error))
      throw error
    }
    dispatch(actions.appendCommitListSuccess(newCommitList.slice(1)))
  }
}
