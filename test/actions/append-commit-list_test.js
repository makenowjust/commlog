/* global describe, it, afterEach */

import expect from 'expect'
import { shouldFulfilled, shouldRejected } from 'promise-test-helper'
import nock from 'nock'

import { API_ENTRY_POINT, REPO_NAME, REPO_BRANCH } from '../../src/config'
import { appendCommitList, types } from '../../src/actions'

const {
  APPEND_COMMIT_LIST_REQUEST,
  APPEND_COMMIT_LIST_SUCCESS,
  APPEND_COMMIT_LIST_FAILURE
} = types

const commitList = require('./replies/commit-list.json')
const appendList = require('./replies/append-list.json')
const UNTIL = commitList[commitList.length - 1].commit.author.date

describe('appendCommitList', () => {
  it('should request GitHub API successfully', () => {
    const scope = nock(API_ENTRY_POINT)
      .get(`/repos/${REPO_NAME}/commits`)
      .query({sha: REPO_BRANCH, until: UNTIL})
      .once()
      .reply(200, appendList)
    const dispatch = expect.createSpy()

    return shouldFulfilled(appendCommitList()(dispatch, () => ({commitList}))).then(() => {
      scope.done()

      expect(dispatch.calls.length).toBe(2)
      expect(dispatch.calls[0].arguments[0].type).toBe(APPEND_COMMIT_LIST_REQUEST)
      expect(dispatch.calls[1].arguments[0].type).toBe(APPEND_COMMIT_LIST_SUCCESS)
      expect(dispatch.calls[1].arguments[0].payload.commitList.length).toBe(appendList.length - 1)
    })
  })

  it('should fail by having no commit', () => {
    const scope = nock(API_ENTRY_POINT)
      .get(`/repos/${REPO_NAME}/commits`)
      .query({sha: REPO_BRANCH, until: UNTIL})
      .once()
      .reply(200, appendList)
    const dispatch = expect.createSpy()

    return shouldRejected(appendCommitList()(dispatch, () => {
    })).catch(() => {
      expect(scope.pendingMocks().length).toBe(1)
      expect(dispatch.calls.length).toBe(2)
      expect(dispatch.calls[0].arguments[0].type).toBe(APPEND_COMMIT_LIST_REQUEST)
      expect(dispatch.calls[1].arguments[0].type).toBe(APPEND_COMMIT_LIST_FAILURE)
      expect(dispatch.calls[1].arguments[0].payload.error).toExist()
    })
  })

  it('should fail by failed to request GitHub API (404)', () => {
    const scope = nock(API_ENTRY_POINT)
      .get(`/repos/${REPO_NAME}/commits`)
      .query({sha: REPO_BRANCH, until: UNTIL})
      .once()
      .replyWithFile(404, __dirname + '/replies/not-found.json')
    const dispatch = expect.createSpy()

    return shouldRejected(appendCommitList()(dispatch, () => ({commitList}))).catch(() => {
      scope.done()

      expect(dispatch.calls.length).toBe(2)
      expect(dispatch.calls[0].arguments[0].type).toBe(APPEND_COMMIT_LIST_REQUEST)
      expect(dispatch.calls[1].arguments[0].type).toBe(APPEND_COMMIT_LIST_FAILURE)
      expect(dispatch.calls[1].arguments[0].payload.error.message).toMatch(/\(404\)/)
    })
  })

  it('should fail by failed to request GitHub API (401)', () => {
    const scope = nock(API_ENTRY_POINT)
      .get(`/repos/${REPO_NAME}/commits`)
      .query({sha: REPO_BRANCH, until: UNTIL})
      .once()
      .replyWithFile(401, __dirname + '/replies/bad-credential.json')
    const dispatch = expect.createSpy()

    return shouldRejected(appendCommitList()(dispatch, () => ({commitList}))).catch(() => {
      scope.done()

      expect(dispatch.calls.length).toBe(2)
      expect(dispatch.calls[0].arguments[0].type).toBe(APPEND_COMMIT_LIST_REQUEST)
      expect(dispatch.calls[1].arguments[0].type).toBe(APPEND_COMMIT_LIST_FAILURE)
      expect(dispatch.calls[1].arguments[0].payload.error.message).toMatch(/\(401\)/)
    })
  })

  it('should fail by failed to request GitHub API (403)', () => {
    const scope = nock(API_ENTRY_POINT)
      .get(`/repos/${REPO_NAME}/commits`)
      .query({sha: REPO_BRANCH, until: UNTIL})
      .once()
      .replyWithFile(403, __dirname + '/replies/rate-limit.json')
    const dispatch = expect.createSpy()

    return shouldRejected(appendCommitList()(dispatch, () => ({commitList}))).catch(() => {
      scope.done()

      expect(dispatch.calls.length).toBe(2)
      expect(dispatch.calls[0].arguments[0].type).toBe(APPEND_COMMIT_LIST_REQUEST)
      expect(dispatch.calls[1].arguments[0].type).toBe(APPEND_COMMIT_LIST_FAILURE)
      expect(dispatch.calls[1].arguments[0].payload.error.message).toMatch(/\(403\)/)
    })
  })

  afterEach(() => {
    nock.cleanAll()
  })
})
