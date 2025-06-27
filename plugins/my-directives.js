import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import oneDarkPro from "shiki/themes/one-dark-pro";

// 单例高亮器实例
let highlighter = null;

export default defineNuxtPlugin(async (nuxtApp) => {
  // 初始化高亮器（只执行一次）
  if (!highlighter) {
    highlighter = await createHighlighterCore({
      themes: [oneDarkPro],
      langs: [
        import("shiki/langs/javascript"),
        import("shiki/langs/html"),
        import("shiki/langs/css"),
        import("shiki/langs/json"),
        import("shiki/langs/shell"),
        import("shiki/langs/vue"),
        import("shiki/langs/markdown"),
      ],
      engine: createJavaScriptRegexEngine(),
    });
  }

  nuxtApp.vueApp.directive("highlight", {
    mounted(el) {
      processCodeBlocks(el, highlighter);
    },
    updated(el) {
      processCodeBlocks(el, highlighter);
    },
    getSSRProps() {
      return {};
    },
  });
});

// 统一处理代码块
async function processCodeBlocks(el, highlighter) {
  const blocks = el.querySelectorAll("pre");

  for (const block of blocks) {
    try {
      const code = block.textContent.trim();
      const lang = detectLanguage(block);

      // 使用高亮器实例
      const html = highlighter.codeToHtml(code, {
        lang,
        theme: "one-dark-pro",
      });

      // 创建一个新的 wrapper div 包含原来的 pre 的 class
      const wrapper = document.createElement("div");
      wrapper.className = block.className; // 保留原来 pre 的 class
      wrapper.innerHTML = html; // 插入高亮后的代码

      // 保留原 pre 的样式并替换内容
      block.replaceWith(wrapper);
    } catch (error) {
      console.warn("代码高亮失败:", error);
      block.style.color = "red"; // 错误可视化
    }
  }
}

// 语言检测逻辑
function detectLanguage(block) {
  // 查找以 language- 开头的类名
  const langClass = block
    ? [...block.classList].find((c) => c.startsWith("language-"))
    : null;

  // 如果没有找到匹配的类，默认返回 'javascript'
  return langClass ? langClass.replace("language-", "") : "javascript";
}
