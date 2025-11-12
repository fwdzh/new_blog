<script setup>
import DefaultTheme from 'vitepress/theme-without-fonts'
import Giscus from './Giscus.vue'
import ArticleMeta from './ArticleMeta.vue'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-before>
      <ArticleMeta />
    </template>
    <template #doc-after>
      <Giscus />
    </template>
  </Layout>
</template>