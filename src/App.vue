<template>
  <div>
    <div class="max-w-screen-sm m-auto font-sans font-thin text-zinc-800">
      <header class="text-center mt-12"><RouterLink to="/">Leo</RouterLink></header>
      <div class="py-16 px-7">
        <RouterView />
      </div>
    </div>
    <div class="fixed bottom-0 right-0 mb-4 mr-4">
      <a href="https://buttercms.com">
        <img :width="120" src="https://cdn.buttercms.com/PGJPyIwaQ2KnOA8UyKfH" alt="" />
      </a>
    </div>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<style scoped></style>
