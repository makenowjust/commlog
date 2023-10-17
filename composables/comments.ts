import { DateTime } from "luxon";

export type Comment = {
  markdown: string;
  github: string;
  icon: string;
  time: string;
  id: string;
};

type ApiComment = {
  body: string;
  node_id: string;
  user: {
    login: string;
    avatar_url: string;
  } | null;
  created_at: string;
};

const apiCommentToComment = (data: ApiComment): Comment => ({
  markdown: data.body,
  github: data.user?.login!,
  icon: data.user?.avatar_url!,
  time: DateTime.fromISO(data.created_at).toFormat("yyyy/L/d H:m:s"),
  id: data.node_id,
});

export const useFetchComments = (hash: string) => {
  const comments = ref<Comment[]>([]);
  const error = ref<string | null>(null);
  const loading = ref(false);

  const load = async () => {
    const iterator = octokit.paginate.iterator(
      octokit.rest.repos.listCommentsForCommit,
      {
        owner: "makenowjust",
        repo: "commlog",
        commit_sha: hash,
      },
    );

    loading.value = true;

    try {
      for await (const result of iterator) {
        const commentArray = result.data.map(apiCommentToComment);
        comments.value = [...comments.value, ...commentArray];
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.stack ?? String(err);
      } else {
        error.value = String(err);
      }
      return;
    } finally {
      loading.value = false;
    }
  };

  load();

  return {
    comments,
    error,
    loading,
  };
};
