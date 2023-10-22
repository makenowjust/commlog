import { ResponseFunction, RestContext, RestRequest, rest } from "msw";

import COMMITS_1 from "./data/commits-1.json";
import COMMITS_2 from "./data/commits-2.json";
import COMMIT_048ebce from "./data/commit-048ebceb14ff5367ad8ff9a8a64f920b5a3f9c6d.json";
import COMMIT_536bd03 from "./data/commit-536bd0322ebc5f218208d52830efb5ba7110213e.json";
import COMMENTS_048ebce from "./data/comments-048ebceb14ff5367ad8ff9a8a64f920b5a3f9c6d.json";
import SEARCH_HELLO from "./data/search-hello.json";

const DELAY = 1000;

const handleCommits = (
  req: RestRequest,
  res: ResponseFunction,
  ctx: RestContext,
) => {
  const page = req.url.searchParams.get("page") ?? "1";
  switch (page) {
    case "1":
      return res(
        ctx.delay(DELAY),
        ctx.status(200),
        ctx.set(COMMITS_1.headers),
        ctx.json(COMMITS_1.data),
      );
    case "2":
      return res(
        ctx.delay(DELAY),
        ctx.status(200),
        ctx.set(COMMITS_2.headers as any),
        ctx.json(COMMITS_2.data),
      );
    default:
      return res(ctx.status(404));
  }
};

const handleCommit = (
  req: RestRequest,
  res: ResponseFunction,
  ctx: RestContext,
) => {
  const hash = String(req.params.hash);
  switch (hash) {
    case "048ebceb14ff5367ad8ff9a8a64f920b5a3f9c6d":
      return res(ctx.delay(DELAY), ctx.status(200), ctx.json(COMMIT_048ebce));
    case "536bd0322ebc5f218208d52830efb5ba7110213e":
      return res(ctx.delay(DELAY), ctx.status(200), ctx.json(COMMIT_536bd03));
    default:
      return res(ctx.status(404));
  }
};

const handleCommitComments = (
  req: RestRequest,
  res: ResponseFunction,
  ctx: RestContext,
) => {
  const hash = String(req.params.hash);
  switch (hash) {
    case "048ebceb14ff5367ad8ff9a8a64f920b5a3f9c6d":
      return res(
        ctx.delay(DELAY * 1.5),
        ctx.status(200),
        ctx.set(COMMENTS_048ebce.headers as any),
        ctx.json(COMMENTS_048ebce.data),
      );
    default:
      return res(ctx.status(200), ctx.json([]));
  }
};

const handleSearch = (
  req: RestRequest,
  res: ResponseFunction,
  ctx: RestContext,
) => {
  const q = req.url.searchParams.get("q") ?? "";
  switch (q) {
    case "repo:makenowjust/commlog hello":
      return res(
        ctx.delay(DELAY * 1.5),
        ctx.status(200),
        ctx.set(SEARCH_HELLO.headers as any),
        ctx.json(SEARCH_HELLO.data),
      );
    default:
      return res(ctx.status(404));
  }
};

export const handlers = [
  rest.get(
    "https://api.github.com/repos/makenowjust/commlog/commits",
    handleCommits,
  ),
  rest.get(
    "https://api.github.com/repositories/42772934/commits",
    handleCommits,
  ),
  rest.get(
    "https://api.github.com/repos/makenowjust/commlog/commits/:hash",
    handleCommit,
  ),
  rest.get(
    "https://api.github.com/repos/makenowjust/commlog/commits/:hash/comments",
    handleCommitComments,
  ),
  rest.get("https://api.github.com/search/commits", handleSearch),
];