import Vue from 'vue'
import App from './app.vue'
import Home from './pages/home.vue'
import Results from './pages/results.vue'
import Summary from './pages/summary.vue'
import Survey from './pages/survey.vue'
import { Session } from './services/index'

// Switch off production mode, for meaningful errors during dev
Vue.config.productionTip = false

// Application routes
const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'survey',
    path : '/survey',
    component: Survey,
    meta: { requiresAuth : false }
  },
  {
    name: 'results',
    path: '/results/:company/:department',
    meta: { requiresAuth : true },
    component: Results
  },
  {
    name: 'summary',
    path: '/summary/:company/:department',
    meta: { requiresAuth : true },
    component: Summary
  }
]

/**
 * Once the page is done loading,
 * mount the app inside the container
 */
window.addEventListener('load', () => {
  const router = new VueRouter({routes})

  router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
      if (Session.isLoggedIn) {
        next();
      } else {
        next({ path: '/' });
      }
    }
    next();
  });

  const app = new Vue({router, render: (h) => h(App)})
  app.$mount('#app')
})



