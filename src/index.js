import Vue from 'vue'
import App from './app.vue'
import Home from './pages/home.vue'
import Results from './pages/results.vue'
import Summary from './pages/summary.vue'
import Survey from './pages/survey.vue'

// Switch off production mode, for meaningful errors during dev
Vue.config.productionTip = false

// Application routes
const routes = [
  { path: '/', component: Home },
  { path: '/results', component: Results },
  { path: '/summary', component: Summary },
  { path: '/survey', component: Survey }
]

/**
 * Once the page is done loading,
 * mount the app inside the container
 */
window.addEventListener('load', () => {
  const router = new VueRouter({routes})
  const app = new Vue({router, render: (h) => h(App)})
  app.$mount('#app')
})



