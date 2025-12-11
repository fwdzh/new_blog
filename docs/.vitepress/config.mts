import { defineConfig } from 'vitepress'
import arch from './arch.js'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "Yoshino",
  base: '/',
  description: "A vitePress blog",
  markdown: {
    math: true
  },
  cleanUrls: true,
  head: [
    ['link',
      {
        rel: 'icon',
        href: 'favicon.png'
      }
    ]
  ],
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.png',

    nav: [
      { text: '首页', link: '/' },
      // { text: 'Home', link: '/' },
      { text: 'arch', link: '/notes/archlinux/index' }
    ],
    sidebar: {
      '/notes/archlinux/': arch
    },

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   },
    //   {
    //     text: '示例',
    //     items: [
    //       { text: 'Markdown 示例', link: '/test/markdown-examples' },
    //       { text: '运行时 API 示例', link: '/test/api-examples' }
    //     ]
    //   }
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fwdzh' },
      {
        icon: {
          svg: `<?xml version="1.0"?><svg role="img" viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"><path d="M4.5 7.5C5.328 7.5 6 8.172 
        6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.673 21 0 20.328 0 19.5V9c0-.828.673-1.5 
        1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.827 
        0-1.5-.672-1.5-1.5v-15c0-.828.673-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 
        .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z"/></svg>`
        },
        link: 'https://codeforces.com/profile/Zhangwuji'
      }
    ],
    // 页面底部上下页链接文字 [citation:2]
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // 最后更新时间戳文字 [citation:7]
    lastUpdatedText: '最后更新于',

    // 编辑链接文字
    editLink: {
      pattern: 'https://github.com/fwdzh/life/edit/main/docs/:path', // 请替换为你的仓库地址
      text: '在 GitHub 上编辑此页'
    },

    // 右侧大纲标题 [citation:7]
    outline: {
      label: '页面导航'
    },

    // 返回顶部按钮文字（移动端）[citation:7]
    returnToTopLabel: '回到顶部',

    // 侧边栏菜单文字（移动端）[citation:7]
    sidebarMenuLabel: '菜单',

    // 深色/浅色模式切换文字（移动端）[citation:7]
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    // 本地搜索（可选）
    // search: {
    //   provider: 'local',
    //   placeholder: '搜索文档'
    // }
  },
  transformHead({ assets }) {
    // 1. 过滤出匹配 LXGW 的所有 woff2 文件
    const fontFiles = assets.filter(file => /LXGW[\w-]*\.woff2$/.test(file))

    // 2. 生成对应的 preload link
    return fontFiles.map(file => [
      'link',
      {
        rel: 'preload',
        href: file,          // 比如 /assets/LXGWWenKai-Regular.abcd1234.woff2
        as: 'font',
        type: 'font/woff2',
        crossorigin: ''      // 这一项不能漏，否则跨域加载会被浏览器忽略
      }
    ])
  }
})
