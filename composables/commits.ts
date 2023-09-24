import { DateTime } from "luxon";

export type Commit = {
  markdown: string;
  github: string;
  icon: string;
  time: string;
  hash: string;
};

export type Commits = Record<string, Commit>;

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

const dataToCommit = (data: any): Commit => ({
  markdown: data.commit.message,
  github: data.author.login,
  icon: data.author.avatar_url,
  time: DateTime.fromISO(data.commit.author.date).toFormat("yyyy/L/d H:m:s"),
  hash: data.sha,
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
      const req = await fetch(
        `https://api.github.com/repos/makenowjust/commlog/commits/${hash}`,
      );
      if (req.status !== 200) {
        throw new Error(
          `Unexpected HTTP status: ${req.status} (${req.statusText})`,
        );
      }
      const json = await req.json();
      loading.value = false;
      putCommit(dataToCommit(json));
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

export const useFetchCommits = (startUrl: string) => {
  const { putCommits } = useCommits();

  const loading = ref(false);
  const nextUrl = ref<string | null>(startUrl);
  const hashes = ref<string[]>([]);
  const error = ref<string | null>(null);

  const hasNext = computed(() => nextUrl.value !== null);

  const loadNext = async () => {
    if (!nextUrl.value) {
      return;
    }

    const url = nextUrl.value;
    nextUrl.value = null;
    loading.value = true;
    error.value = null;

    try {
      const req = await fetch(url);
      if (req.status !== 200) {
        throw new Error(
          `Unexpected HTTP status: ${req.status} (${req.statusText})`,
        );
      }
      const json = (await req.json()) as { items: any[] } | any[];
      const commitArray = ("items" in json ? json.items : json).map(
        dataToCommit,
      );
      const link = parseLink(req.headers.get("Link") ?? "");
      loading.value = false;
      nextUrl.value = link.next ?? null;
      hashes.value = [
        ...hashes.value,
        ...commitArray.map((commit) => commit.hash),
      ];
      putCommits(commitArray);
    } catch (err) {
      loading.value = false;
      nextUrl.value = null;
      if (err instanceof Error) {
        error.value = err.stack ?? String(err);
      } else {
        error.value = String(err);
      }
    }
  };

  loadNext();

  return {
    loading,
    hashes,
    error,
    hasNext,
    loadNext,
    nextUrl,
  };
};
