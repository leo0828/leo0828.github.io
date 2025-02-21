<template>
  <div class="w-full h-screen">
    <div class="p-4 max-w-screen-sm m-auto min-h-screen font-sans font-thin text-zinc-800">
      <header class="text-center my-12">Leo</header>
      <RouterView />
    </div>
    <div class="fixed bottom-0 right-0 mb-4 mr-4">
      <a href="https://buttercms.com">
        <img :width="120" src="https://cdn.buttercms.com/PGJPyIwaQ2KnOA8UyKfH" alt="" />
      </a>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style scoped></style>
