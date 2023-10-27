import type { OctokitResponse } from "@octokit/types";

import { DateTime } from "luxon";

export type Commit = {
  markdown: string;
  github: string;
  icon: string;
  time: string;
  hash: string;
  comments: number;
};

export type Commits = Record<string, Commit>;

type ApiCommit = {
  sha: string;
  commit: {
    message: string;
    author: {
      date?: string | undefined;
    } | null;
    comment_count: number;
  };
  author: {
    login: string;
    avatar_url: string;
  } | null;
};

type ApiCommits = ApiCommit[] | { items: ApiCommit[] };

export const useCommits = () => {
  const commits = useState<Commits>("commits", () => Object.create(null));

  const putCommit = (commit: Commit): void => {
    commits.value[commit.hash] = commit;
  };

  const putCommits = (commitArray: Commit[]): void => {
    for (const commit of commitArray) {
      commits.value[commit.hash] = commit;
    }
  };

  return {
    commits,
    putCommit,
    putCommits,
  };
};

const apiCommitToCommit = (data: ApiCommit): Commit => ({
  markdown: data.commit.message,
  github: data.author?.login!,
  icon: data.author?.avatar_url!,
  time: DateTime.fromISO(data.commit.author?.date!).toFormat("yyyy/L/d H:m:s"),
  hash: data.sha,
  comments: data.commit.comment_count,
});

export const useFetchCommit = (hash: string) => {
  const { commits, putCommit } = useCommits();

  const loading = ref(false);
  const error = ref<string | null>(null);

  const commit = computed<Commit | null>(() => commits.value[hash] ?? null);

  const load = async () => {
    if (hash in commits.value) {
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await octokit.rest.repos.getCommit({
        owner: "makenowjust",
        repo: "commlog",
        ref: hash,
      });
      loading.value = false;
      putCommit(apiCommitToCommit(response.data));
    } catch (err) {
      loading.value = false;
      if (err instanceof Error) {
        error.value = err.stack ?? String(err);
      } else {
        error.value = String(err);
      }
    }
  };

  load();

  return {
    loading,
    commit,
    error,
  };
};

const useCommitIterator = (
  iterator: Ref<AsyncIterableIterator<OctokitResponse<ApiCommits, 200>>>,
) => {
  const { putCommits } = useCommits();

  const loading = ref(false);
  const hashes = ref<string[]>([]);
  const error = ref<string | null>(null);
  const hasNext = ref(true);

  const loadNext = async () => {
    if (!hasNext.value || loading.value) {
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const result = await iterator.value.next();
      if (result.done === true) {
        hasNext.value = false;
        return;
      }
      const items =
        "items" in result.value.data
          ? result.value.data.items
          : result.value.data;
      const commitArray = items.map(apiCommitToCommit);
      putCommits(commitArray);
      hashes.value = [
        ...hashes.value,
        ...commitArray.map((commit) => commit.hash),
      ];
      const link = parseLink(result.value.headers.link ?? "");
      hasNext.value = "next" in link;
    } catch (err) {
      hasNext.value = false;
      if (err instanceof Error) {
        error.value = err.stack ?? String(err);
      } else {
        error.value = String(err);
      }
    } finally {
      loading.value = false;
    }
  };

  loadNext();

  return {
    loading,
    hashes,
    error,
    hasNext,
    loadNext,
  };
};

export const useFetchCommits = () => {
  const iterator = ref(
    octokit.paginate
      .iterator(octokit.rest.repos.listCommits, {
        owner: "makenowjust",
        repo: "commlog",
      })
      [Symbol.asyncIterator](),
  );
  return useCommitIterator(iterator);
};

export const useSearchCommits = (q: Ref<string>) => {
  const iterator = computed(() =>
    octokit.paginate
      .iterator(octokit.rest.search.commits, {
        q: `repo:makenowjust/commlog ${q.value}`,
        sort: "author-date",
        order: "desc",
      })
      [Symbol.asyncIterator](),
  );
  const refs = useCommitIterator(iterator);

  watch(
    () => iterator.value,
    () => {
      refs.loading.value = false;
      refs.hashes.value = [];
      refs.error.value = null;
      refs.hasNext.value = true;
      refs.loadNext();
    },
  );

  return refs;
};
