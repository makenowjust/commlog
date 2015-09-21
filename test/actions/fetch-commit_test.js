import expect from 'expect';
import { shouldFulfilled, shouldRejected } from 'promise-test-helper';
import nock from 'nock';

import { API_ENTRY_POINT, REPO_NAME } from '../../src/config';
import { fetchCommit, types } from '../../src/actions';

const {
  FETCH_COMMIT_REQUEST,
  FETCH_COMMIT_SUCCESS,
  FETCH_COMMIT_FAILURE,
} = types;

const DUMMY_SHA = 'db31f48a251c391f259164e35db8e976f7933b10';
const commit = require('./replies/commit.json');

describe('fetchCommit', () => {
  it('should request GitHub API successfully', () => {
    const scope = nock(API_ENTRY_POINT)
      .get(`/repos/${REPO_NAME}/commits/${DUMMY_SHA}`)
      .once()
      .reply(200, commit);
    const dispatch = expect.createSpy();

    return shouldFulfilled(fetchCommit(DUMMY_SHA)(dispatch, ()=>{})).then(() => {
      scope.done();

      expect(dispatch.calls.length).toBe(2);
      expect(dispatch.calls[0].arguments[0].type).toBe(FETCH_COMMIT_REQUEST);
      expect(dispatch.calls[0].arguments[0].payload.sha).toBe(DUMMY_SHA);
      expect(dispatch.calls[1].arguments[0].type).toBe(FETCH_COMMIT_SUCCESS);
      expect(dispatch.calls[1].arguments[0].payload.sha).toBe(DUMMY_SHA);
    });
  });

  it('should not request GitHub API when cached', () => {
    const scope = nock(API_ENTRY_POINT)
      .get(`/repos/${REPO_NAME}/commits/${DUMMY_SHA}`)
      .once()
      .reply(200, commit);
    const dispatch = expect.createSpy();

    return shouldFulfilled(fetchCommit(DUMMY_SHA)(dispatch, ()=>({commitCache: {[DUMMY_SHA]: commit}}))).then(() => {
      expect(scope.pendingMocks().length).toBe(1);
      expect(dispatch.calls.length).toBe(0);
    });
  });

  it('should fail by failed to request GitHub API (404)', () => {
    const dummySHA = `${DUMMY_SHA}xxxx`;
    const scope = nock(API_ENTRY_POINT)
      .get(`/repos/${REPO_NAME}/commits/${dummySHA}`)
      .once()
      .replyWithFile(404, __dirname + '/replies/not-found.json');
    const dispatch = expect.createSpy();

    return shouldRejected(fetchCommit(dummySHA)(dispatch, ()=>{})).catch(() => {
      scope.done();

      expect(dispatch.calls.length).toBe(2);
      expect(dispatch.calls[0].arguments[0].type).toBe(FETCH_COMMIT_REQUEST);
      expect(dispatch.calls[0].arguments[0].payload.sha).toBe(dummySHA);
      expect(dispatch.calls[1].arguments[0].type).toBe(FETCH_COMMIT_FAILURE);
      expect(dispatch.calls[1].arguments[0].payload.sha).toBe(dummySHA);
      expect(dispatch.calls[1].arguments[0].payload.error.message).toMatch(/\(404\)/);
    });
  });

  it('should fail by failed to request GitHub API (401)', () => {
    const scope = nock(API_ENTRY_POINT)
      .get(`/repos/${REPO_NAME}/commits/${DUMMY_SHA}`)
      .once()
      .replyWithFile(401, __dirname + '/replies/bad-credential.json');
    const dispatch = expect.createSpy();

    return shouldRejected(fetchCommit(DUMMY_SHA)(dispatch, ()=>{})).catch(() => {
      scope.done();

      expect(dispatch.calls.length).toBe(2);
      expect(dispatch.calls[0].arguments[0].type).toBe(FETCH_COMMIT_REQUEST);
      expect(dispatch.calls[0].arguments[0].payload.sha).toBe(DUMMY_SHA);
      expect(dispatch.calls[1].arguments[0].type).toBe(FETCH_COMMIT_FAILURE);
      expect(dispatch.calls[1].arguments[0].payload.sha).toBe(DUMMY_SHA);
      expect(dispatch.calls[1].arguments[0].payload.error.message).toMatch(/\(401\)/);
    });
  });

  it('should fail by failed to request GitHub API (403)', () => {
    const scope = nock(API_ENTRY_POINT)
      .get(`/repos/${REPO_NAME}/commits/${DUMMY_SHA}`)
      .once()
      .replyWithFile(403, __dirname + '/replies/rate-limit.json');
    const dispatch = expect.createSpy();

    return shouldRejected(fetchCommit(DUMMY_SHA)(dispatch, ()=>{})).catch(() => {
      scope.done();

      expect(dispatch.calls.length).toBe(2);
      expect(dispatch.calls[0].arguments[0].type).toBe(FETCH_COMMIT_REQUEST);
      expect(dispatch.calls[0].arguments[0].payload.sha).toBe(DUMMY_SHA);
      expect(dispatch.calls[1].arguments[0].type).toBe(FETCH_COMMIT_FAILURE);
      expect(dispatch.calls[1].arguments[0].payload.sha).toBe(DUMMY_SHA);
      expect(dispatch.calls[1].arguments[0].payload.error.message).toMatch(/\(403\)/);
    });
  });

  afterEach(() => {
    nock.cleanAll();
  });
});
