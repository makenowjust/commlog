import type { ResponseResolver } from "msw";

import { http, delay, HttpResponse } from "msw";

import COMMITS_1 from "./data/commits-1.json";
import COMMITS_2 from "./data/commits-2.json";
import COMMIT_048ebce from "./data/commit-048ebceb14ff5367ad8ff9a8a64f920b5a3f9c6d.json";
import COMMIT_536bd03 from "./data/commit-536bd0322ebc5f218208d52830efb5ba7110213e.json";
import COMMENTS_048ebce from "./data/comments-048ebceb14ff5367ad8ff9a8a64f920b5a3f9c6d.json";
import SEARCH_HELLO from "./data/search-hello.json";

const handleCommits: ResponseResolver = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") ?? "1";
  switch (page) {
    case "1":
      await delay();
      return HttpResponse.json(COMMITS_1.data, {
        headers: COMMITS_1.headers,
      });
    case "2":
      await delay();
      return HttpResponse.json(COMMITS_2.data, {
        headers: COMMITS_2.headers,
      });
    default:
      return new HttpResponse(null, { status: 404 });
  }
};

const handleCommit: ResponseResolver = async ({ params }) => {
  const { hash } = params as any;
  switch (hash) {
    case "048ebceb14ff5367ad8ff9a8a64f920b5a3f9c6d":
      await delay();
      return HttpResponse.json(COMMIT_048ebce);
    case "536bd0322ebc5f218208d52830efb5ba7110213e":
      await delay();
      return HttpResponse.json(COMMIT_536bd03);
    default:
      await delay();
      return new HttpResponse(null, { status: 404 });
  }
};

const handleCommitComments: ResponseResolver = async ({ params }) => {
  const { hash } = params as any;
  console.log(hash);
  switch (hash) {
    case "048ebceb14ff5367ad8ff9a8a64f920b5a3f9c6d":
      await delay();
      return HttpResponse.json(COMMENTS_048ebce.data, {
        headers: COMMENTS_048ebce.headers,
      });
    default:
      return HttpResponse.json([]);
  }
};

const handleSearch: ResponseResolver = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  switch (q) {
    case "repo:makenowjust/commlog hello":
      await delay();
      return HttpResponse.json(SEARCH_HELLO.data, {
        headers: SEARCH_HELLO.headers,
      });
    default:
      return new HttpResponse(null, { status: 404 });
  }
};

export const handlers = [
  http.get(
    "https://api.github.com/repos/makenowjust/commlog/commits",
    handleCommits,
  ),
  http.get(
    "https://api.github.com/repositories/42772934/commits",
    handleCommits,
  ),
  http.get(
    "https://api.github.com/repos/makenowjust/commlog/commits/:hash",
    handleCommit,
  ),
  http.get(
    "https://api.github.com/repos/makenowjust/commlog/commits/:hash/comments",
    handleCommitComments,
  ),
  http.get("https://api.github.com/search/commits", handleSearch),
];
