<script setup>
import { ref, onMounted } from 'vue'
import { data as posts } from './posts.data.js'

const isLoading = ref(true)
const error = ref(null)

onMounted(() => {
  console.log("Posts data:", posts)
  isLoading.value = false
})
</script>

<template>
  <h1>All Blog Posts</h1>
  
  <div v-if="isLoading">Loading posts...</div>
  
  <div v-else-if="posts && posts.length">
    <ul>
      <li v-for="post of posts" :key="post.url">
        <a :href="post.url">{{ post.frontmatter.title }}</a>
        <span>by {{ post.frontmatter.author }}</span>
      </li>
    </ul>
  </div>
  
  <div v-else>
    No posts found.
  </div>
</template>