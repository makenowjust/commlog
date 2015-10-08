/* global describe, it */

import expect from 'expect'

import { types } from '../../src/actions'
import fetchCommitList from '../../src/reducers/fetch-commit-list'

const {
  FETCH_COMMIT_LIST_REQUEST,
  FETCH_COMMIT_LIST_SUCCESS,
  FETCH_COMMIT_LIST_FAILURE
} = types

describe('fetchCommitList', () => {
  it('should return "init" state', () => {
    expect(fetchCommitList(undefined, {}).status).toBe('init')
  })

  it('should change state to "request" by request', () => {
    expect(fetchCommitList(undefined, {type: FETCH_COMMIT_LIST_REQUEST}).status).toBe('request')
  })

  it('should change state to "success" by success', () => {
    expect(fetchCommitList({type: 'request'}, {type: FETCH_COMMIT_LIST_SUCCESS}).status).toBe('success')
  })

  it('should change state to "failure" by failure', () => {
    expect(fetchCommitList({type: 'request'}, {type: FETCH_COMMIT_LIST_FAILURE}).status).toBe('failure')
  })
})
