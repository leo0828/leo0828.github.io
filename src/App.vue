<template>
  <div>
    <div class="max-w-screen-md m-auto text-zinc-800">
      <header class="flex flex-col items-center justify-center mt-12">
        <a href="https://github.com/leo0828" target="_blank" class="flex items-center gap-2">
          <img class="w-4 h-4" src="/github-mark.png" alt="" srcset="" />Leo
        </a>
      </header>
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
