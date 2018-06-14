import MockAdapter from 'axios-mock-adapter';

import COMMIT from '../test/fixtures/commit';
import COMMITS1 from '../test/fixtures/commits1';
import COMMITS2 from '../test/fixtures/commits2';
import SEARCH from '../test/fixtures/search';

export default ({$axios}) => {
  const mock = new MockAdapter($axios);

  mock
    .onGet('https://api.github.com/repos/MakeNowJust/commlog/commits')
    .reply(200, COMMITS1.data, COMMITS1.headers);
  mock
    .onGet('https://api.github.com/repositories/42772934/commits?page=2')
    .reply(200, COMMITS2.data, COMMITS2.headers);
  mock
    .onGet(
      'https://api.github.com/repos/MakeNowJust/commlog/commits/048ebceb14ff5367ad8ff9a8a64f920b5a3f9c6d',
    )
    .reply(200, COMMIT);
  mock
    .onGet(
      'https://api.github.com/search/commits?q=repo%3AMakeNowJust%2Fcommlog%20hello&sort=author-date&order=desc',
    )
    .reply(200, SEARCH.data, SEARCH.headers);
};
