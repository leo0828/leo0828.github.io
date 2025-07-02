<template>
  <section>
    <div v-if="loading" class="flex justify-center pt-20">
      <Loader />
    </div>
    <ul v-else>
      <li
        v-for="post in posts"
        :key="post.id"
        class="py-7 border-b border-gray-200 relative"
      >
        <div
          class="text-zinc-400 text-xs mb-2 sm:mb-0 sm:absolute sm:left-0 sm:top-8.5 tracking-widest"
        >
          {{ new Date(post.published_at).toLocaleDateString() }}
        </div>
        <h2
          class="hover:text-sky-500 sm:text-xl transition duration-300 sm:ml-24 tracking-wide"
        >
          <NuxtLink :to="`/posts/${post.id}`">
            {{ post.title }}
          </NuxtLink>
        </h2>
      </li>
    </ul>
  </section>
</template>

<script setup>
const perPage = 30;
const page = ref(1);
const loading = ref(false);
const posts = ref([]);

const api = useApi();

const getPosts = async () => {
  loading.value = true;
  try {
    const data = await api.get("/articles", {
      params: {
        username: "leo0828",
        page: page.value,
        per_page: perPage,
      },
    });
    posts.value = data;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getPosts();
});
</script>

<style scoped></style>
