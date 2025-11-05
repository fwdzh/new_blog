import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/**/*.md', {
  transform : (rawData) => {
    return rawData.map(post => {
      if(post.frontmatter.date){
        post.frontmatter.ddate = post.frontmatter.date.
          toISOString().split('T')[0] // "2025-11-04 改日期格式
      }
      return post
    })
    .sort((a, b) => {
      return b.frontmatter.date - a.frontmatter.date
    })
  }
})