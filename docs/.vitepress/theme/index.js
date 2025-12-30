import DefaultTheme from 'vitepress/theme-without-fonts';
import './my-fonts.css';
import MyLayout from './components/MyLayout.vue';

// BEGIN 查看图片 vitepress-plugin-image-viewer
import 'viewerjs/dist/viewer.min.css';
import imageViewer from 'vitepress-plugin-image-viewer';
// import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';
import { useRoute } from 'vitepress';
// END

export default {
    ...DefaultTheme,
    // BEGIN
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx);
        // 注册全局组件（可选）
        // ctx.app.component('vImageViewer', vImageViewer);
    },
    // END

    // 使用自定义布局
    Layout: MyLayout,
    setup() {
        const route = useRoute();
        imageViewer(route);
    },
};
