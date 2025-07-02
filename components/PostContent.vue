<template>
  <div class="tracking-wide">
    <div
      v-if="postUpdated"
      class="text-zinc-400 text-sm mb-6 flex items-center"
    >
      <span class="h-4 w-0.5 rounded-full bg-zinc-200 mr-3" />
      更新于：{{ new Date(postUpdated).toLocaleString() }}
    </div>
    <h1 v-if="postTitle" class="text-2xl sm:text-3xl font-medium mb-9">
      {{ postTitle }}
    </h1>
    <!-- eslint-disable vue/no-v-html -->
    <div
      v-if="highlightedBody"
      ref="contentRef"
      class="text-zinc-800 text-sm sm:text-base space-y-4 sm:space-y-6"
      v-html="highlightedBody"
    />
    <!-- eslint-enable vue/no-v-html -->
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  postBody: {
    type: String,
    default: "",
  },
  postTitle: {
    type: String,
    default: "",
  },
  postUpdated: {
    type: [String, Number],
    default: "",
  },
});

const { $marked } = useNuxtApp();
const contentRef = ref(null);
const highlightedBody = ref("");

const detectLanguage = (block) => {
  // 查找以 language- 开头的类名
  const langClass = block
    ? [...block.classList].find((c) => c.startsWith("language-"))
    : null;

  // 如果没有找到匹配的类，默认返回 'javascript'
  return langClass ? langClass.replace("language-", "") : "javascript";
};

watch(
  () => props.postBody,
  async (body) => {
    if (!body) {
      return;
    }

    body = $marked(body);
    // 解析并高亮
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = body;
    const codeBlocks = tempDiv.querySelectorAll("pre");

    for (const block of codeBlocks) {
      const code = block.textContent.trim();
      const lang = detectLanguage(block);

      const highlighter = await getShikiHighlighter();
      const result = highlighter.highlight(code, { lang });
      const wrapper = document.createElement("div");

      wrapper.innerHTML = result;
      block.replaceWith(wrapper.firstChild);
    }

    highlightedBody.value = tempDiv.innerHTML;
  },
  { immediate: true }
);
</script>

<style scoped>
:deep(code) {
  font-size: 14px !important;
}

:deep(pre.shiki) {
  padding: 12px;
  overflow-y: auto;
}

:deep(b),
:deep(strong) {
  font-weight: 500;
}
</style>
