const exchangeCodeForToken = async (code) => {
  // eslint-disable-next-line no-console
  console.log(`CALLING THE MOCK exchangeCodeForToken! ${code}`);
  return 'MOCK TOKEN FOR CODE';
};

const getGithubProfile = async (token) => {
  // eslint-disable-next-line no-console
  console.log(`CALLING THE MOCK getGithubProfile ${token}`);
  return {
    login: 'theFakest_user',
    avatar_url: 'https://www.placecage.com/gif/300/300',
    email: 'thefakest@test.com',
  };
};

module.exports = { exchangeCodeForToken, getGithubProfile };
