<template>
  <div>
    <commit hash="832cde60d7f0c114a4c9fe0a746d2105e5665a52" />
  </div>
</template>

<script>
import Commit from '~/components/Commit.vue';

export default {
  components: {Commit},
  fetch({store}) {
    const commit = {
      hash: '832cde60d7f0c114a4c9fe0a746d2105e5665a52',
      author: {
        name: 'MakeNowJust',
        email: 'make.just.on@gmail.com',
        icon: 'https://avatars3.githubusercontent.com/u/6679325?v=4',
      },
      date: new Date('2018-05-12T01:53:56Z'),
      message: `
# bat

https://github.com/sharkdp/bat

\`cat\`のクローンと言っているが少し違う気がする。

シンタックスハイライトしてくれたり、自動で出力をlessに流してくれたりする感じ。

Rustで書かれてる。
`,
    };
    store.commit('commits/put', {commit});
  }
};
</script>
