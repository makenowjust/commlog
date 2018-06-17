import test from 'ava';
import td from 'testdouble';

import * as loader from '../../lib/loader';

test('mutation setLoading switches loading flag', t => {
  const state = {...loader.state};
  loader.mutations.setLoading(state, {loading: true});
  t.is(state.loading, true);
  loader.mutations.setLoading(state, {loading: false});
  t.is(state.loading, false);
});

test('mutation setError sets an error', t => {
  const state = {...loader.state};
  const error = new Error('error');
  loader.mutations.setError(state, {error});
  t.is(state.error, error);
});

test('load wraps loading action', async t => {
  const commit = td.function();
  await loader.load(commit, async () => {
    commit('test');
  });
  td.verify(commit('setError', {error: null}), {times: 1});
  td.verify(commit('setLoading', {loading: true}), {times: 1});
  td.verify(commit('test'), {times: 1});
  td.verify(commit('setLoading', {loading: false}), {times: 1});
  t.pass();
});

test('load wraps loading action with an error', async t => {
  const commit = td.function();
  const error = await t.throws(
    loader.load(commit, async () => {
      commit('test');
      throw new Error('error');
    }),
  );
  td.verify(commit('setError', {error: null}), {times: 1});
  td.verify(commit('setLoading', {loading: true}), {times: 1});
  td.verify(commit('test'), {times: 1});
  td.verify(commit('setError', {error}), {times: 1});
});
