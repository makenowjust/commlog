import * as parseLinkHeader from 'parse-link-header';
import {URL} from 'universal-url';

export const convertCommit = raw => ({
  hash: raw.sha,
  message: raw.commit.message,
  author: {
    github: !!(raw.author && raw.author.login),
    name: (raw.author && raw.author.login) || raw.commit.author.name,
    email: raw.commit.author.email,
    icon: raw.author && raw.author.avatar_url,
  },
  date: new Date(raw.commit.author.date),
});

export const convertPage = response => {
  const raws = response.data.items || response.data;
  const commits = raws.map(convertCommit);
  const hashes = commits.map(({hash}) => hash);

  const link = parseLinkHeader(response.headers.link || '');
  let next = (link && link.next && link.next.url) || null;
  if (next) {
    next = new URL(next);
  }

  return {commits, hashes, next};
};
