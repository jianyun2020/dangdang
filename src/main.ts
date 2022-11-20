import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { LmgUtil } from './utils/imgUtil'

createApp(App).mount('#app')

LmgUtil.storageImgList()