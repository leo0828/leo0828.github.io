<template>
  <section>
    <div v-if="loading" class="flex justify-center pt-20">
      <Loader />
    </div>
    <PostContent v-else :post="post" />
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
    const res = await api.get(`/posts/${route.params.id}`);
    post.value = res.data;
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
