import parseLinkHeader from 'parse-link-header';

import * as markdown from './markdown';

export const convertCommit = raw => ({
  hash: raw.sha,
  author: {
    github: Boolean(raw.author && raw.author.login),
    name: (raw.author && raw.author.login) || raw.commit.author.name,
    email: raw.commit.author.email,
    icon: raw.author && raw.author.avatar_url,
  },
  date: new Date(raw.commit.author.date),
  ...markdown.parse(raw.commit.message),
});

export const convertPage = response => {
  const raws = response.data.items || response.data;
  const commits = raws.map(convertCommit);
  const hashes = commits.map(({hash}) => hash);

  const link = parseLinkHeader(response.headers.link || '');
  const next = (link && link.next && link.next.url) || null;

  return {commits, hashes, next};
};
