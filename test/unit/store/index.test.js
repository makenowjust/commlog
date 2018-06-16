import test from 'ava';

import * as store from '../../../store/index';

test('mutation putCommit puts a commit', t => {
  const state = store.state();
  const hash = '1234567890';
  const commit = {hash};
  store.mutations.putCommit(state, {commit});
  t.is(state.commitCache[hash], commit)
});

test('mutation putCommits puts commits', t => {
  const state = store.state();
  const hashes = ['1234', '5678'];
  const commits = hashes.map(hash => ({hash}));
  store.mutations.putCommits(state, {commits});
  t.is(state.commitCache[hashes[0]], commits[0]);
  t.is(state.commitCache[hashes[1]], commits[1]);
});

test('getter commit gets a commit', t => {
  const hash = '1234567890';
  const commit = { hash };
  const state = {
    ...store.state(),
    commitCache: {
      '1234567890': commit
    },
  };
  t.is(store.getters.commit(state)(hash), commit);
});

test('getter commit gets no commit as null', t => {
  const state = store.state();
  t.is(store.getters.commit(state)('unknown_hash'), null);
});
