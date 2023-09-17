<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const q = ref(route.query.q ?? "");

router.afterEach((to) => {
  q.value = to.query.q ?? "";
});

const search = () => {
  router.push({
    name: "search",
    query: { q: q.value },
  });
};
</script>

<template>
  <header class="pt-24 pb-8 w-full">
    <h1 class="mb-20 w-full">
      <NuxtLink to="/">
        <img
          class="mx-auto w-[220px] sm:w-[330px]"
          src="~/assets/img/logo.svg"
          alt="commlog - Commit Log as a Blog"
        />
      </NuxtLink>
    </h1>
    <section class="container mx-auto text-center">
      <div class="w-6 h-6 text-xl/5 align-middle text-center inline-block">
        <ClientOnly>
          <FontAwesomeIcon :icon="['fas', 'magnifying-glass']" />
        </ClientOnly>
      </div>
      <input
        v-model="q"
        type="text"
        class="text-xl/5 pl-7 pr-2 py-2 -ml-7 bg-transparent w-60"
        placeholder="Search commits"
        @keyup.enter="search"
      />
    </section>
  </header>
  <main>
    <NuxtPage />
  </main>
</template>
