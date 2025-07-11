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
      ref="contentRef"
      class="text-zinc-800 text-sm sm:text-base space-y-4 sm:space-y-6"
      v-html="highlightedBody"
    />
    <!-- eslint-enable vue/no-v-html -->
  </div>
</template>

<script setup>
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

// 缓存 highlighter 实例
let highlighterPromise = null;
const getHighlighter = async () => {
  if (!highlighterPromise) {
    highlighterPromise = getShikiHighlighter();
  }
  return highlighterPromise;
};

const detectLanguage = (classList) => {
  if (!classList) return "javascript";
  const langClass = [...classList].find((c) => c.startsWith("language-"));
  return langClass ? langClass.replace("language-", "") : "javascript";
};

watch(
  () => props.postBody,
  async (body) => {
    if (!body) {
      highlightedBody.value = "";
      return;
    }

    let html = $marked(body);
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const preBlocks = tempDiv.querySelectorAll("pre");

    if (preBlocks.length > 0) {
      const highlighter = await getHighlighter();
      for (const block of preBlocks) {
        const codeEl = block.querySelector("code");
        const code = codeEl ? codeEl.textContent.trim() : "";
        const lang = detectLanguage(codeEl?.classList);
        const result = highlighter.highlight(code, { lang });
        const wrapper = document.createElement("div");
        wrapper.innerHTML = result;
        block.replaceWith(wrapper.firstChild);
      }
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

:deep(li) {
  margin: 8px 0;
  list-style: disc inside;
}

:deep(h2) {
  font-size: 1.25rem;
  font-weight: 400;
}
</style>
