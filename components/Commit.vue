<template>
  <article :class="$style.wrap">
    <section :class="$style.body">
      <h1>ローディングアニメーション作った</h1>
      <p><a href="https://codepen.io/MakeNowJust/pen/YLYbgw">https://codepen.io/MakeNowJust/pen/YLYbgw</a></p>
      <p>四角形がスクロールするだけのやつ。それっぽくなった気がする。</p>
    </section>
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

.body {
  margin: 0 auto;
  max-width: $max-width;

  @import "~@/assets/scss/markdown";
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
