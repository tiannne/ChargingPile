import { createApp } from 'vue'
import App from './App.vue';
import router from './router'
/* 引入mock */
import'./api/mock.js'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//将配置好的状态管理与Vue结合起来
import store from './store/index.js';


//以下为引入全局样式
//import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(store);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')


