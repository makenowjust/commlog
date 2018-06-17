import test from 'ava';
import td from 'testdouble';

import Axios from 'axios';

import axiosMock from '../../../../plugins/axios-mock';
import * as store from '../../../../store/pages/search';
import * as rootStore from '../../../../store';
import {convertPage} from '../../../../lib/github';

import SEARCH from '../../../fixtures/search';

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

test('mutation setQuery does not change anything if query is not changed', t => {
  const query = 'query';
  const hashes = ['1234', '5678'];
  const next = 'http://example.com/next';
  const state = {...store.state(), query, hashes, next};
  store.mutations.setQuery(state, {query});
  t.is(state.query, query);
  t.is(state.hashes, hashes);
  t.is(state.next, next);
});

test('mutation setQuery sets query and reset hashes and next URL', t => {
  const query = 'new query';
  const hashes = ['1234', '5678'];
  const next = 'http://example.com/next';
  const state = {...store.state(), hashes, next};
  store.mutations.setQuery(state, {query});
  t.is(state.query, query);
  t.deepEqual(state.hashes, []);
  t.is(
    state.next,
    'https://api.github.com/search/commits?q=repo%3AMakeNowJust%2Fcommlog%20new%20query&sort=author-date&order=desc',
  );
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
  const query = 'query';
  const state = store.state();
  const dispatch = td.function();
  const commit = td.function();
  await store.actions.load({state, dispatch, commit}, {query});
  td.verify(commit('setQuery', {query}), {times: 1});
  td.verify(dispatch('loadMore'), {times: 1});
  t.pass();
});

test('action load loads no commit if hashes is not empty', async t => {
  const query = 'query';
  const state = {...store.state(), query, hashes: ['0000']};
  const dispatch = td.function();
  const commit = td.function();
  await store.actions.load({state, dispatch, commit}, {query});
  td.verify(commit('setQuery', {query}), {times: 1});
  td.verify(dispatch('loadMore'), {times: 0});
  t.pass();
});

test('action loadMore loads more commits from next URL', async t => {
  const next =
    'https://api.github.com/search/commits?q=repo%3AMakeNowJust%2Fcommlog%20hello&sort=author-date&order=desc';
  const state = {...store.state(), next};
  const commit = td.function();
  await store.actions.loadMore.call(scope, {state, commit});
  const page = convertPage(SEARCH);
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
