<template>
  <div>
    <header :class="$style.header">
      <h1><nuxt-link to="/" v-test="'top-link'">commlog</nuxt-link></h1>
      <section :class="$style.search">
        <div :class="$style.icon"><icon name="search" /></div>
        <input placeholder="Search commits" v-model="query" @keyup.enter="search" v-test="'search'" />
      </section>
    </header>
    <main>
      <nuxt />
    </main>
  </div>
</template>

<style module lang="scss">
@import '~@/assets/scss/variables';

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

  > .icon {
    display: inline-block;
    left: 0;
    right: 0;
    width: 1.5rem;
    height: 1.5rem;
    font-size: 1.3rem;
    text-align: center;
    vertical-align: middle;
  }

  > input {
    padding: 0.5rem 0.5rem 0.5rem 1.75rem;
    margin-left: -2rem;
    border: none;
    width: 15rem;
    background: transparent;

    &:focus {
      outline: $light-blue auto 0.2rem;
    }
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
      query: this.$route.query.q || '',
    };
  },
  methods: {
    search() {
      const q = this.query.trim();

      // Prevent for searching because empty query causes an error.
      if (q === '') {
        //return;
      }

      this.$router.push({
        name: 'search',
        query: {q},
      });
    },
  },
  watch: {
    $route() {
      this.query = this.$route.query.q;
    },
  },
};
</script>
