/* global describe, it */

import expect from 'expect'

import { types } from '../../src/actions'
import fetchCommit from '../../src/reducers/fetch-commit'

const {
  FETCH_COMMIT_REQUEST,
  FETCH_COMMIT_SUCCESS,
  FETCH_COMMIT_FAILURE
} = types

describe('fetchCommit', () => {
  it('should return "init" state', () => {
    expect(fetchCommit(undefined, {}).status).toBe('init')
  })

  it('should change state to "request" by request', () => {
    expect(fetchCommit(undefined, {type: FETCH_COMMIT_REQUEST}).status).toBe('request')
  })

  it('should change state to "success" by success', () => {
    expect(fetchCommit({type: 'request'}, {type: FETCH_COMMIT_SUCCESS}).status).toBe('success')
  })

  it('should change state to "failure" by failure', () => {
    expect(fetchCommit({type: 'request'}, {type: FETCH_COMMIT_FAILURE}).status).toBe('failure')
  })
})
