/* global describe, it, afterEach */

import expect from 'expect'
import { shouldFulfilled, shouldRejected } from 'promise-test-helper'
import nock from 'nock'

import { API_ENTRY_POINT, REPO_NAME, REPO_BRANCH } from '../../src/config'
import { fetchCommitList, types } from '../../src/actions'

const {
  FETCH_COMMIT_LIST_REQUEST,
  FETCH_COMMIT_LIST_SUCCESS,
  FETCH_COMMIT_LIST_FAILURE
} = types

const commitList = require('./replies/commit-list.json')

describe('fetchCommitList', () => {
  it('should request GitHub API successfully', () => {
    const scope = nock(API_ENTRY_POINT)
      .get(`/repos/${REPO_NAME}/commits`)
      .query({sha: REPO_BRANCH})
      .once()
      .reply(200, commitList)
    const dispatch = expect.createSpy()

    return shouldFulfilled(fetchCommitList()(dispatch, () => {
    })).then(() => {
      scope.done()

      expect(dispatch.calls.length).toBe(2)
      expect(dispatch.calls[0].arguments[0].type).toBe(FETCH_COMMIT_LIST_REQUEST)
      expect(dispatch.calls[1].arguments[0].type).toBe(FETCH_COMMIT_LIST_SUCCESS)
    })
  })

  it('should not request GitHub API when cached', () => {
    const scope = nock(API_ENTRY_POINT)
      .get(`/repos/${REPO_NAME}/commits`)
      .once()
      .query({sha: REPO_BRANCH})
      .reply(200, commitList)
    const dispatch = expect.createSpy()

    return shouldFulfilled(fetchCommitList()(dispatch, () => ({commitList}))).then(() => {
      expect(scope.pendingMocks().length).toBe(1)
      expect(dispatch.calls.length).toBe(0)
    })
  })

  it('should not request GitHub API when cached (cache is empty array)', () => {
    const scope = nock(API_ENTRY_POINT)
      .get(`/repos/${REPO_NAME}/commits`)
      .once()
      .query({sha: REPO_BRANCH})
      .reply(200, [])
    const dispatch = expect.createSpy()

    return shouldFulfilled(fetchCommitList()(dispatch, () => ({commitList: []}))).then(() => {
      expect(scope.pendingMocks().length).toBe(1)
      expect(dispatch.calls.length).toBe(0)
    })
  })

  it('should fail by failed to request GitHub API (404)', () => {
    const scope = nock(API_ENTRY_POINT)
      .get(`/repos/${REPO_NAME}/commits`)
      .query({sha: REPO_BRANCH})
      .once()
      .replyWithFile(404, __dirname + '/replies/not-found.json')
    const dispatch = expect.createSpy()

    return shouldRejected(fetchCommitList()(dispatch, () => {
    })).catch(() => {
      scope.done()

      expect(dispatch.calls.length).toBe(2)
      expect(dispatch.calls[0].arguments[0].type).toBe(FETCH_COMMIT_LIST_REQUEST)
      expect(dispatch.calls[1].arguments[0].type).toBe(FETCH_COMMIT_LIST_FAILURE)
      expect(dispatch.calls[1].arguments[0].payload.error.message).toMatch(/\(404\)/)
    })
  })

  it('should fail by failed to request GitHub API (401)', () => {
    const scope = nock(API_ENTRY_POINT)
      .get(`/repos/${REPO_NAME}/commits`)
      .query({sha: REPO_BRANCH})
      .once()
      .replyWithFile(401, __dirname + '/replies/bad-credential.json')
    const dispatch = expect.createSpy()

    return shouldRejected(fetchCommitList()(dispatch, () => {
    })).catch(() => {
      scope.done()

      expect(dispatch.calls.length).toBe(2)
      expect(dispatch.calls[0].arguments[0].type).toBe(FETCH_COMMIT_LIST_REQUEST)
      expect(dispatch.calls[1].arguments[0].type).toBe(FETCH_COMMIT_LIST_FAILURE)
      expect(dispatch.calls[1].arguments[0].payload.error.message).toMatch(/\(401\)/)
    })
  })

  it('should fail by failed to request GitHub API (403)', () => {
    const scope = nock(API_ENTRY_POINT)
      .get(`/repos/${REPO_NAME}/commits`)
      .query({sha: REPO_BRANCH})
      .once()
      .replyWithFile(403, __dirname + '/replies/rate-limit.json')
    const dispatch = expect.createSpy()

    return shouldRejected(fetchCommitList()(dispatch, () => {
    })).catch(() => {
      scope.done()

      expect(dispatch.calls.length).toBe(2)
      expect(dispatch.calls[0].arguments[0].type).toBe(FETCH_COMMIT_LIST_REQUEST)
      expect(dispatch.calls[1].arguments[0].type).toBe(FETCH_COMMIT_LIST_FAILURE)
      expect(dispatch.calls[1].arguments[0].payload.error.message).toMatch(/\(403\)/)
    })
  })

  afterEach(() => {
    nock.cleanAll()
  })
})
