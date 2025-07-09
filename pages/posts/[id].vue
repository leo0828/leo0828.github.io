<template>
  <section>
    <div v-if="loading" class="flex justify-center pt-20">
      <Loader />
    </div>
    <PostContent
      v-else
      :post-title="post.title"
      :post-body="post.body_markdown"
      :post-updated="post.edited_at"
    />
  </section>
</template>

<script setup>
const route = useRoute();
const post = ref({});
const loading = ref(false);
const api = useApi();

const getPosts = async () => {
  loading.value = true;
  try {
    const res = await api.get(`/articles/${route.params.id}`);
    post.value = res;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

getPosts();
</script>

<style scoped></style>
