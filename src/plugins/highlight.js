// plugins/highlight.js
import Hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css' // 你可以选择其他主题

export default {
  install(app) {
    // 自定义指令 v-highlight
    app.directive('highlight', {
      // 在元素被挂载到 DOM 之前
      beforeMount(el) {
        let blocks = el.querySelectorAll('pre code')
        for (let i = 0; i < blocks.length; i++) {
          Hljs.highlightBlock(blocks[i])
        }
      },
      // 在元素更新后调用
      updated(el) {
        let blocks = el.querySelectorAll('pre code')
        for (let i = 0; i < blocks.length; i++) {
          Hljs.highlightBlock(blocks[i])
        }
      },
    })
  },
}
