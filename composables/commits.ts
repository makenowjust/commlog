export type Commit = {
  markdown: string;
  github: string;
  icon: string;
  time: string;
  hash: string;
};

export type Commits = Record<string, Commit>;

const mock1 = {
  markdown: `# Middle to click

<https://github.com/artginzburg/MiddleClick-Ventura>

3本指タップで中クリックできるようにするやつ。
トラックパッドだと中クリックできないのかと思っていたので、便利なときは便利。
でも暴発することも多いので、普段はoffにしておきたいかも。
`,
  github: 'makenowjust',
  icon: 'https://avatars.githubusercontent.com/u/6679325?v=4',
  time: '2023/9/12 14:35:06',
  hash: '3c92b74e573100d513b3a9187ffa0b11cff1d87c'
};

const mock2 = {
  markdown: `# Love Ya Like A Sister

<https://fonts.google.com/specimen/Love+Ya+Like+A+Sister>

なんか圧のつよいフォント。
面白いのでいつか使いたい。

${'```console'}
$ echo hello world
${'```'}
`,
  github: 'makenowjust',
  icon: 'https://avatars.githubusercontent.com/u/6679325?v=4',
  time: '2023/8/22 13:57:17',
  hash: '4237749cb614044ce8b62a61d9513e42ed9f2d45',
};

export const useCommits = () => useState<Commits>('commits', () => ({
  [mock1.hash]: mock1,
  [mock2.hash]: mock2,
}));

export const usePutCommit = () => {
  const commits = useCommits();
  return (commit: Commit): void => {
    commits.value[commit.hash] = commit;
  };
};

export const usePutCommits = () => {
  const commits = useCommits();
  return (commitArray: Commit[]): void => {
    for (const commit of commitArray) {
      commits.value[commit.hash] = commit;
    }
  };
};