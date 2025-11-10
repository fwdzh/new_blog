import DefaultTheme from 'vitepress/theme-without-fonts'
import './my-fonts.css'
import MyLayout from './MyLayout.vue'

export default {
  ...DefaultTheme,
  // 使用自定义布局
  Layout: MyLayout
}