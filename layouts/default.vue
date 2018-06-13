<template>
  <div>
    <header :class="$style.header">
      <h1>
        <nuxt-link
          v-test="'top-link'"
          to="/">
          <img
            :class="$style.logo"
            src="~/assets/img/logo.png"
            alt="commlog logo">
        </nuxt-link>
      </h1>
      <section :class="$style.search">
        <div :class="$style.icon"><icon name="search" /></div>
        <input
          v-test="'search'"
          v-model="query"
          placeholder="Search commits"
          @keyup.enter="search" >
      </section>
    </header>
    <main>
      <nuxt />
    </main>
  </div>
</template>

<style module lang="scss">
@import '~../assets/scss/variables';

.header {
  width: 100%;
  padding: 6rem 0 0;

  > h1 {
    width: 100%;
    margin: 0 0 5rem;
    font-size: 2.5rem;
    font-weight: normal;
    text-align: center;
    line-height: 3rem;

    .logo {
      width: 330px;
      height: auto;

      @media screen and (max-width: $max-width) {
        width: 165px;
      }
    }

    > a {
      color: $black;
      text-decoration: none;
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
    width: 1.5rem;
    height: 1.5rem;
    right: 0;
    left: 0;
    vertical-align: middle;
    font-size: 1.3rem;
    text-align: center;
  }

  > input {
    width: 15rem;
    padding: 0.5rem 0.5rem 0.5rem 1.75rem;
    border: none;
    margin-left: -2rem;
    background: transparent;

    &:focus {
      outline: $light-blue auto 0.2rem;
    }
  }
}
</style>

<script>
// eslint-disable-next-line import/no-unassigned-import
import 'vue-awesome/icons/search';
import Icon from 'vue-awesome/components/Icon.vue';

export default {
  components: {Icon},
  data() {
    return {
      query: this.$route.query.q || '',
    };
  },
  watch: {
    $route() {
      this.query = this.$route.query.q;
    },
  },
  methods: {
    search() {
      const q = this.query.trim();

      // Prevent for searching because empty query causes an error.
      if (q === '') {
        return;
      }

      this.$router.push({
        name: 'search',
        query: {q},
      });
    },
  },
};
</script>
