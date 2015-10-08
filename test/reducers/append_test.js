/* global describe, it */

import expect from 'expect'

import { types } from '../../src/actions'
import append from '../../src/reducers/append'

const {
  APPEND_COMMIT_LIST_REQUEST,
  APPEND_COMMIT_LIST_SUCCESS,
  APPEND_COMMIT_LIST_FAILURE
} = types

describe('append', () => {
  it('should be succeeded initially', () => {
    expect(append(undefined, {}).status).toBe('success')
  })

  it('should not be finished initially', () => {
    expect(append(undefined, {}).finish).toBe(false)
  })

  it('should change state to "request" by request', () => {
    expect(append(undefined, {type: APPEND_COMMIT_LIST_REQUEST}).status).toBe('request')
  })

  it('should change state to "success" by success', () => {
    expect(append({type: 'request'}, {type: APPEND_COMMIT_LIST_SUCCESS, payload: {commitList: []}}).status)
      .toBe('success')
  })

  it('should finish when commit list is empty', () => {
    expect(append({type: 'request'}, {type: APPEND_COMMIT_LIST_SUCCESS, payload: {commitList: []}}).finish)
      .toBe(true)
  })

  it('should change state to "failure" by failure', () => {
    expect(append({type: 'request'}, {type: APPEND_COMMIT_LIST_FAILURE}).status)
      .toBe('failure')
  })
})
