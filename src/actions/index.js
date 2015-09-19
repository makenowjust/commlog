import fetch from 'isomorphic-fetch';
import { API_ENTRY_POINT, REPO_NAME, OAUTH_TOKEN } from '../config';

export let types = {};
let actions = {};
function action(name, ...params) {
  let type = name.replace(/([A-Z])/g, '_$1').toUpperCase();
  types[type] = type;
  actions[name] = (...values) => ({
    type,
    payload: params.reduce((payload, param, idx) => {
      payload[param] = values[idx];
      return payload;
    }, {}),
  });
}

function fetchWrapper(url) {
  return fetch(url, {
    method: 'get',
    headers: {
      'authorization': 'token ' + OAUTH_TOKEN,
    },
  });
}

action('fetchCommitRequest', 'sha');
action('fetchCommitSuccess', 'sha', 'commit');
action('fetchCommitFailure', 'sha', 'error');

function shouldFetchCommit(state, sha) {
  return !(sha in state.commitCache);
}

async function realFetchCommit(sha) {
  return (await fetchWrapper(`${API_ENTRY_POINT}/repos/${REPO_NAME}/commits/${sha}`)).json();
}

export function fetchCommit(sha) {
  return async (dispatch, getState) => {
    if (shouldFetchCommit(getState(), sha)) {
      dispatch(actions.fetchCommitRequest(sha));
      let commit;
      try {
        commit = await realFetchCommit(sha);
      } catch (error) {
        dispatch(actions.fetchCommitFailure(sha, error));
        return;
      }
      dispatch(actions.fetchCommitSuccess(sha, commit));
    }
  };
};

action('fetchCommitListRequest');
action('fetchCommitListSuccess', 'commitList');
action('fetchCommitListFailure', 'error');

function shouldFetchCommitList(state) {
  return !(state.commitList && state.commitList.length >= 1);
}

async function realFetchCommitList() {
  return (await fetchWrapper(`${API_ENTRY_POINT}/repos/${REPO_NAME}/commits?sha=${encodeURIComponent(REPO_BRANCH)}`)).json();
}

export function fetchCommitList() {
  return async (dispatch, getState) => {
    if (shouldFetchCommitList(getState())) {
      dispatch(actions.fetchCommitListRequest());
      let commitList;
      try {
        commitList = await realFetchCommitList();
      } catch (error) {
        dispatch(actions.fetchCommitListFailure(error));
        return;
      }
      dispatch(actions.fetchCommitListSuccess(commitList));
    }
  };
};

action('appendCommitListRequest');
action('appendCommitListSuccess', 'commitList');
action('appendCommitListFailure', 'error');

async function realAppendCommitList(until) {
  return (await fetchWrapper(`${API_ENTRY_POINT}/repos/${REPO_NAME}/commits?until=${encodeURIComponent(until)}`)).json();
}

export function appendCommitList() {
  return async (dispatch, getState) => {
    dispatch(actions.appendCommitListRequest());
    let { commitList } = getState();
    let lastCommit = commitList[commitList.length - 1];
    let newCommitList;
    try {
      newCommitList = await realAppendCommitList(lastCommit.commit.author.date);
    } catch (error) {
      dispatch(actions.appendCommitListFailure(error));
      return;
    }
    dispatch(actions.appendCommitListSuccess(newCommitList.slice(1)));
  };
}
