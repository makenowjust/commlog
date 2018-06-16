import test from 'ava';
import td from 'testdouble';

import Axios from 'axios';

import axiosMock from '../../../../plugins/axios-mock';
import * as rootStore from '../../../../store';
import * as store from '../../../../store/pages/commit';
import {convertCommit} from '../../../../lib/github';

import COMMIT from '../../../fixtures/commit';

const $axios = Axios.create();
const scope = {$axios};
axiosMock(scope);

test('mutation setHash sets a hash', t => {
  const state = store.state();
  const hash = '1234567890';
  store.mutations.setHash(state, {hash});
  t.is(state.hash, hash);
});

test('getter commit gets a commit', t => {
  const hash = '1234567890';
  const commit = {hash};
  const state = {...store.state(), hash};
  const getters = {}; // It is dummy.
  const rootState = {
    ...rootStore.state(),
    commitCache: {[hash]: commit},
  };
  const rootGetters = {commit: rootStore.getters.commit(rootState)};
  t.is(store.getters.commit(state, getters, rootState, rootGetters), commit);
});

test('action load loads a commit', async t => {
  const hash = '048ebceb14ff5367ad8ff9a8a64f920b5a3f9c6d';
  const getters = {commit: null};
  const commit = td.function();
  await store.actions.load.call(scope, {commit, getters}, {hash});
  td.verify(commit('setHash', {hash}));
  td.verify(commit('setError', {error: null}));
  td.verify(commit('setLoading', {loading: true}));
  td.verify(commit('putCommit', {commit: convertCommit(COMMIT)}, {root: true}));
  td.verify(commit('setLoading', {loading: false}));
  t.pass();
});

test('action load sets an error', async t => {
  const hash = 'unknown_hash';
  const getters = {commit: null};
  const commit = td.function();
  let error = null;
  try {
    await store.actions.load.call(scope, {commit, getters}, {hash});
  } catch (err) {
    error = err;
  }
  td.verify(commit('setHash', {hash}));
  td.verify(commit('setError', {error: null}));
  td.verify(commit('setLoading', {loading: true}));
  td.verify(commit('setError', {error}));
  t.pass();
});

test('action load loads no commit if loaded', async t => {
  const hash = '1234567890';
  const getters = {commit: {hash}};
  const commit = td.function();
  await store.actions.load({commit, getters}, {hash});
  td.verify(commit('setHash', {hash}));
  t.pass();
});
