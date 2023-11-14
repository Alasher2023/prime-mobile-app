import '@/assets/base.css'
import 'primevue/resources/themes/lara-light-teal/theme.css'
import 'primeicons/primeicons.css'
import '../node_modules/primeflex/primeflex.css'

import PrimeVue from 'primevue/config';

import axios from 'axios'
import VueAxios from 'vue-axios'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(VueAxios,axios)
app.use(createPinia())
app.use(router)
app.use(PrimeVue)



app.mount('#app')
