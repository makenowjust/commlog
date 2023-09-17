import { DateTime } from "luxon";

export type Comment = {
  markdown: string;
  github: string;
  icon: string;
  time: string;
  id: string;
};

const dataToComment = (data: any): Comment => ({
  markdown: data.body,
  github: data.user.login,
  icon: data.user.avatar_url,
  time: DateTime.fromISO(data.created_at).toFormat("yyyy/L/d H:m:s"),
  id: data.node_id,
});

export const useFetchComments = (hash: string) => {
  const comments = ref<Comment[]>([]);
  const error = ref<string | null>(null);
  const loading = ref(false);

  const load = async () => {
    loading.value = true;

    let url: string | null;
    url = `https://api.github.com/repos/makenowjust/commlog/commits/${hash}/comments`;
    while (url !== null) {
      try {
        const req = await fetch(url);
        if (req.status !== 200) {
          throw new Error(
            `Unexpected HTTP status: ${req.status} (${req.statusText})`,
          );
        }
        const json = await req.json();
        const link = parseLink(req.headers.get("Link") ?? "");
        url = link.next ?? null;
        comments.value = [...comments.value, ...json.map(dataToComment)];
      } catch (err) {
        loading.value = false;
        url = null;
        if (err instanceof Error) {
          error.value = err.stack ?? String(err);
        } else {
          error.value = String(err);
        }
        return;
      }
    }

    loading.value = false;
  };

  load();

  return {
    comments,
    error,
    loading,
  };
};
