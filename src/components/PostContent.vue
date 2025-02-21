<template>
  <div>
    <div class="text-zinc-400 text-sm mb-6 flex items-center">
      <span class="h-4 w-0.5 rounded-full bg-zinc-200 mr-3"></span>
      {{ new Date(post.updated).toLocaleString() }}
    </div>
    <h1 class="text-2xl sm:text-3xl font-normal mb-9">{{ post.title }}</h1>
    <div
      class="text-zinc-700 text-sm sm:text-base space-y-4 sm:space-y-6"
      v-highlight
      v-html="post.body"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped>
:deep(code) {
  font-size: 12px !important;
}
</style>
