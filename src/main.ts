import './assets/main.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import Home from './pages/AppHome.vue'
import Favorites from './pages/AppFavorites.vue'

const app = createApp(App)
const pinia = createPinia()

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/favorites', name: 'Favorites', component: Favorites },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(pinia)
app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')
