import { combineReducers } from 'redux';
import fetchCommit from './fetch-commit';
import fetchCommitList from './fetch-commit-list';
import append from './append';
import commitList from './commit-list';
import commitCache from './commit-cache';

export default combineReducers({
  fetchCommit,
  fetchCommitList,
  append,
  commitList,
  commitCache,
});
