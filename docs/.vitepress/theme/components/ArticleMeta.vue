<!-- .vitepress/theme/components/ArticleMeta.vue -->
<script setup>
import { useData } from 'vitepress'

const { frontmatter } = useData()

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return null
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // 月份从 0 开始，补齐两位
  const day = date.getDate().toString().padStart(2, '0') // getDay() 是返回星期几，这里需要 getDate()
  return `${year}-${month}-${day}`
}
</script>

<template>
  <div class="article-meta" v-if="frontmatter.date">
    <div class="meta-item">
      <svg class="meta-icon" viewBox="0 0 1024 1024" width="16" height="16">
        <path fill="currentColor" d="M512 77.1c-240.3 0-435 194.8-435 435 0 240.3 194.8 435 435 435 240.3 0 435-194.8 435-435s-194.7-435-435-435z m232.7 640.1L468.2 535.8V190.1h87.7v298.4l237 155.4-48.2 73.3z"/>
      </svg>
    {{ formatDate(frontmatter.date) }}
    </div>
  </div>
</template>

<style scoped>
.article-meta {
  margin: 1rem 0 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider-light);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.meta-icon {
  opacity: 0.6;
}

@media (max-width: 768px) {
  .article-meta {
    margin: 0.75rem 0 1.5rem;
  }
}
</style>