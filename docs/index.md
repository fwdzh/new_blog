---
layout: home
title: index
---
<style src="./.vitepress/stylesheets/index.css"> </style>

<script setup>
import { data as Posts } from './posts.data.js'
import { ref, computed } from 'vue'
// 每页显示多少篇文章
const pageSize = 10

// 当前页
const currentPage = ref(1)

// 计算总页数
const totalPages = computed(() => Math.ceil(Posts.length / pageSize))

// 计算当前页要显示的文章
const pagedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return Posts.slice(start, start + pageSize)
})

// 翻页函数
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
</script>

<p v-if="Posts && Posts.length">Total Posts: {{ Posts.length }}</p>
<div v-if="Posts && Posts.length">
  <!-- <div v-for="post in Posts" :key="post.url" class="post-item">
    <p>
      <span class = 'date'>
        {{ post.frontmatter.ddate }}
      </span>
        &nbsp;
      <a :href="post.url">
        {{ post.frontmatter.title }}
      </a>
    </p>
  </div> -->

  <div v-for="post in pagedPosts" :key="post.url" class="post-item">
    <p>
      <span class="date">{{ post.frontmatter.ddate }}</span>
      &nbsp;
      <a :href="post.url">{{ post.frontmatter.title }}</a>
    </p>
  </div>

  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
    <span>第 {{ currentPage }} / {{ totalPages }} 页</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
  </div>
</div>