import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "孙笑川258",
  base: '/',
  description: "A VitePress Site",
  markdown: {
    math: true
  },
  head : [
      ['link', 
        { rel : 'icon',
          href : 'favicon.png'
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
      { text: 'Examples', link: '/markdown-examples' },
      { text: '测试', link : '/test/'}
    ],

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
      { icon: 'github', link: 'https://github.com/fwdzh' }
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
  }
  
})
