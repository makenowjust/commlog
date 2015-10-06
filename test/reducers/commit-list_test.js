import expect from 'expect';

import { types } from '../../src/actions';
import commitList from '../../src/reducers/commit-list';

const {
  FETCH_COMMIT_LIST_SUCCESS,
  APPEND_COMMIT_LIST_SUCCESS,
} = types;

describe('commitList', () => {
  it('should be empty array initially', () => {
    expect(commitList(undefined, {})).toEqual([]);
  });

  it('should return commits by fetching commit list', () => {
    const status = [{sha: 'a'}];
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
    expect(commitList(status, {type, payload}))
      .toEqual(payload.commitList);
  });

  it('should return commits by fetching commit list', () => {
    const status = [{sha: 'a'}];
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
    expect(commitList(status, {type, payload}))
      .toEqual(status.concat(payload.commitList));
  });
});
