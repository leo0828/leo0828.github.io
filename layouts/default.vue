<template>
  <div class="min-h-screen flex flex-col">
    <div class="w-full max-w-2xl flex-1 m-auto text-zinc-800 flex flex-col">
      <MyHeader />
      <div class="py-16 px-6 flex-1">
        <NuxtPage />
      </div>
    </div>
    <BackToTop />
  </div>
</template>

<script setup></script>

<style scoped></style>
