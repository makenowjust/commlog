import test from 'ava';
import td from 'testdouble';

import Axios from 'axios';

import axiosMock from '../../../../plugins/axios-mock';
import * as store from '../../../../store/pages';
import * as rootStore from '../../../../store';
import {convertPage} from '../../../../lib/github';

import COMMITS from '../../../fixtures/commits1';

const $axios = Axios.create();
const scope = {$axios};
axiosMock(scope);

test('mutation appendPage appends hashes and sets a next URL', t => {
  const state = {...store.state(), hashes: ['0000']};
  const hashes = ['1234', '5678'];
  const next = 'http://example.com/next';
  store.mutations.appendPage(state, {hashes, next});
  t.deepEqual(state.hashes, ['0000', '1234', '5678']);
  t.is(state.next, next);
});

test('getter hasNext returns true if it has next URL', t => {
  const state = {...store.state(), hashes: ['0000'], next: 'http://example.com/next'};
  t.is(store.getters.hasNext(state), true);
});

test('getter hasNext returns false if it has no next URL', t => {
  const state = {...store.state(), hashes: ['0000'], next: null};
  t.is(store.getters.hasNext(state), false);
});

test('getter hasNext returns false if it has no hash', t => {
  const state = {...store.state(), hashes: [], next: 'http://example.com/next'};
  t.is(store.getters.hasNext(state), false);
});

test('getter commits getrs commits from hashes', t => {
  const hashes = ['0000', '1234', '5678'];
  const commits = hashes.map(hash => ({hash}));
  const state = {...store.state(), hashes};
  const getters = {}; // It's dummy.
  const rootState = rootStore.state();
  for (const commit of commits) {
    rootState.commitCache[commit.hash] = commit;
  }
  const rootGetters = {commit: rootStore.getters.commit(rootState)};
  t.deepEqual(store.getters.commits(state, getters, rootState, rootGetters), commits);
});

test('action load loads more commits if hashes is empty', async t => {
  const state = store.state();
  const dispatch = td.function();
  await store.actions.load({state, dispatch});
  td.verify(dispatch('loadMore'), {times: 1});
  t.pass();
});

test('action load loads no commit if hashes is not empty', async t => {
  const state = {...store.state(), hashes: ['0000']};
  const dispatch = td.function();
  await store.actions.load({state, dispatch});
  td.verify(dispatch('loadMore'), {times: 0});
  t.pass();
});

test('action loadMore loads more commits from next URL', async t => {
  const state = store.state();
  const commit = td.function();
  await store.actions.loadMore.call(scope, {state, commit});
  const page = convertPage(COMMITS);
  td.verify(commit('setError', {error: null}), {times: 1});
  td.verify(commit('setLoading', {loading: true}), {times: 1});
  td.verify(commit('putCommits', page, {root: true}), {times: 1});
  td.verify(commit('appendPage', page), {times: 1});
  td.verify(commit('setLoading', {loading: false}), {times: 1});
  t.pass();
});

test('action loadMore sets an error', async t => {
  const state = {...store.state(), next: 'http://example.com/not_found'};
  const commit = td.function();
  const error = await t.throws(store.actions.loadMore.call(scope, {state, commit}));
  td.verify(commit('setError', {error: null}), {times: 1});
  td.verify(commit('setLoading', {loading: true}), {times: 1});
  td.verify(commit('setError', {error}), {times: 1});
});

test('action loadMore loads no commit if it has no next URL', async t => {
  const state = {...store.state(), next: null};
  const commit = td.function();
  await store.actions.loadMore.call(scope, {state, commit});
  td.verify(commit(), {times: 0, ignoreExtraArgs: true});
  t.pass();
});
