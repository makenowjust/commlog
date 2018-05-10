<template>
  <div>
    <header :class="$style.header">
      <h1><nuxt-link to="/">commlog</nuxt-link></h1>
    </header>
    <main>
      <nuxt />
    </main>
  </div>
</template>

<style module lang="scss">
.header {
  width: 100%;
  padding: 6rem 0;

  > h1 {
    font-size: 2.5rem;
    font-weight: normal;
    line-height: 3rem;
    margin: 0;
    width: 100%;
    text-align: center;

    > a {
      text-decoration: none;
    }
  }
}
</style>
