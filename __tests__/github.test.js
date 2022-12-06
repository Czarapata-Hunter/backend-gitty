const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { agent } = require('supertest');

jest.mock('../lib/services/githubServices');

describe('github auth', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('/api/v1/github/login should redirect to the github oauth page', async () => {
    const res = await request(app).get('/api/v1/github/login');
    expect(res.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/callback/i
    );
  });

  it('/api/v1/github/callback will login and then redirect user to the dashboard', async () => {
    const resp = await request
      .agent(app)
      .get('/api/v1/github/callback?code=117')
      .redirects(1);
    expect(resp.body).toEqual({
      id: expect.any(String),
      login: 'theFakest_user',
      email: 'thefakest@test.com',
      avatar: 'https://www.placecage.com/gif/300/300',
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  it('DELETE /api/v1/github should sign out a user', async () => {
    await request
      .agent(app)
      .get('/api/v1/github/callback?code=117')
      .redirects(1);
    const signOut = await agent(app).delete('/api/v1/github');
    expect(signOut.status).toBe(204);
    const grab = await agent(app).get('/api/v1/github');
    expect(grab.status).toBe(404);
  });
});
