<template>
  <div>
    <header :class="$style.header">
      <h1>commlog</h1>
    </header>
    <main>
      <nuxt />
    </main>
  </div>
</template>

<style module>
.header > h1 {
  font-size: 2.5rem;
  font-weight: normal;
  margin: 7rem 0 7rem 0;
  line-height: 3rem;
  width: 100%;
  text-align: center;
}
</style>
