import Vue from 'vue'
import App from './app.vue'
import Home from './pages/home.vue'
import Alarms from './pages/alarms.vue'
import Movies from './pages/movies.vue'

// Switch off production mode, for meaningful errors during dev
Vue.config.productionTip = false

// Application routes
const routes = [
  { path: '/', component: Home },
  { path: '/alarms', component: Alarms },
  { path: '/movies', component: Movies }
]

/**
 * Once the page is done loading,
 * mount the app inside the container
 */
window.addEventListener('load', () => {
  const router = new VueRouter({ routes })
  const app = new Vue({ router, render: (h) => h(App) })
  app.$mount('#app')
})
