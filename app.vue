<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  titleTemplate: (title) => (title ? `${title} | Leo Blog` : "Leo Blog"),
});
</script>

<style></style>
