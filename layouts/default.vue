<template>
  <div>
    <header :class="$style.header">
      <h1><nuxt-link to="/">commlog</nuxt-link></h1>
      <section :class="$style.search">
        <icon name="search" />
        <input placeholder="Search commits" v-model="query" @keyup.enter="search" />
      </section>
    </header>
    <main>
      <nuxt />
    </main>
  </div>
</template>

<style module lang="scss">
@import "~@/assets/scss/variables";

.header {
  width: 100%;
  padding: 6rem 0 0 0;

  > h1 {
    font-size: 2.5rem;
    font-weight: normal;
    line-height: 3rem;
    margin: 0 0 5rem 0;
    width: 100%;
    text-align: center;

    > a {
      text-decoration: none;
      color: $black;
      transition: color ease 0.3s 0s;

      &:hover {
        color: $light-blue;
      }
    }
  }
}

.search {
  max-width: $max-width;
  margin: 0 auto;
  text-align: center;

  > input {
    width: 15rem;
  }
}
</style>

<script>
import 'vue-awesome/icons/search';
import Icon from 'vue-awesome/components/Icon';

export default {
  components: {Icon},
  data() {
    return {
      query: this.$route.query.search || '',
    };
  },
  methods: {
    search() {
      this.$router.push({
        name: 'index',
        query: {
          search: this.query.trim(),
        },
      });
    },
  },
  watch: {
    $route() {
      this.query = this.$route.query.search;
    },
  }
};
</script>
