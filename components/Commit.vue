<template>
  <article :class="$style.wrap">
    <commit-body
      source="
# bat

https://github.com/sharkdp/bat

`cat`のクローンと言っているが少し違う気がする。

シンタックスハイライトしてくれたり、自動で出力をlessに流してくれたりする感じ。

Rustで書かれてる。
"
      />
    <section :class="$style.foot"><!-- This comment is not needed really, however it is for code styling.
      --><a :class="$style.author" href="https://github.com/MakeNowJust">MakeNowJust<img src="https://avatars3.githubusercontent.com/u/6679325?v=4" /></a><!--
      --><time datetime="2018-05-09T01:33:29Z">2018/05/09 01:33:29</time><!--
      --><nuxt-link :class="$style.hash" to="/commit/5ff985097ea9a10a6d2944ce283a62373379cbdd">#5ff98</nuxt-link>
    </section>
  </article>
</template>

<style module lang="scss">
@import "~@/assets/scss/variables";

.wrap {
  border-bottom: 0.0625rem solid $light-gray;
}

.foot {
  margin: 0 auto 1rem auto;
  max-width: $max-width;
  text-align: right;

  > :not(:last-child) {
    margin-right: 1em;
  }

  > .author {
    > img {
      height: 1em;
      width: 1em;
    }
  }

  > .hash {
    background-color: $black;
    color: $white;
    font-family: $monospace;
    padding: 0 0.25em;
    transition: color ease 0.3s 0s;

    &:hover {
      color: $light-blue;
    }
  }
}
</style>

<script>
import CommitBody from '~/components/CommitBody.vue';

export default {
  components: {CommitBody},
};
</script>
