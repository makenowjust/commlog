import expect from 'expect';

import { types } from '../../src/actions';
import commitCache from '../../src/reducers/commit-cache';

const {
  FETCH_COMMIT_SUCCESS,
  FETCH_COMMIT_LIST_SUCCESS,
  APPEND_COMMIT_LIST_SUCCESS,
} = types;

describe('commitCache', () => {
  it('should be empty object initially', () => {
    expect(commitCache(undefined, {})).toEqual({});
  });

  it('should append commit by fetching a commit', () => {
    const status = {a: {}};
    const type = FETCH_COMMIT_SUCCESS;
    const payload = {
      sha: 'b',
    };
    payload.commit = payload;
    expect(commitCache(status, {type, payload}))
      .toEqual(Object.assign({}, status, {
        [payload.sha]: payload.commit,
      }));
  });

  it('should append commits by fetching commit list', () => {
    const status = {a: {}};
    const type = FETCH_COMMIT_LIST_SUCCESS;
    const payload = {};
    payload.commitList = [
      {
        sha: 'b',
      },
      {
        sha: 'c',
      },
    ];
    expect(commitCache(status, {type, payload}))
      .toEqual(Object.assign({}, status, {
        b: payload.commitList[0],
        c: payload.commitList[1],
      }));
  });

  it('should append commits by appending commit list', () => {
    const status = {a: {}};
    const type = APPEND_COMMIT_LIST_SUCCESS;
    const payload = {};
    payload.commitList = [
      {
        sha: 'b',
      },
      {
        sha: 'c',
      },
    ];
    expect(commitCache(status, {type, payload}))
      .toEqual(Object.assign({}, status, {
        b: payload.commitList[0],
        c: payload.commitList[1],
      }));
  });
});
