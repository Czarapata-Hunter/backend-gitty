const { Router } = require('express');
const {
  exchangeCodeForToken,
  getGithubProfile,
} = require('../services/githubServices');
module.exports = Router()
  .get('/login', (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
    );
  })
  .get('/callback', async (req, res, next) => {
    try {
      const { code } = req.query;
      const token = await exchangeCodeForToken(code);
      res.json({ token });

      const user = await getGithubProfile(token);
      console.log(user);
    } catch (error) {
      next(error);
    }
  });
