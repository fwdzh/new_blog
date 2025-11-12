<template>
  <div id="giscus-container" class="giscus-wrapper"></div>
</template>

<script setup>
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

const loadGiscus = () => {
  // 清除现有内容
  const container = document.getElementById('giscus-container')
  if (container) {
    container.innerHTML = ''
  }

  // 创建 script 元素
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'fwdzh/new_blog')
  script.setAttribute('data-repo-id', 'R_kgDOQPbV-w')
  script.setAttribute('data-category', 'Announcements')
  script.setAttribute('data-category-id', 'DIC_kwDOQPbV-84Cxokx')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', 'preferred_color_scheme')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true

  // 添加到容器
  if (container) {
    container.appendChild(script)
  }
}

onMounted(() => {
  // 延迟加载以确保 DOM 完全渲染
  setTimeout(loadGiscus, 500)
})

// 监听路由变化
watch(() => route.path, () => {
  nextTick(() => {
    setTimeout(loadGiscus, 500)
  })
})
</script>

<style scoped>
.giscus-wrapper {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}
</style>