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
      path: '/',
      component: Home
    },
    {
      path : '/survey',
      component: Survey,
      meta: { requiresAuth : false }
    },
    {
      path: '/results',
      component: Results ,
      meta: { requiresAuth : true }
    },
    {
      path: '/summary',
      component: Summary ,
      meta: { requiresAuth : true }
    }
]

/**
 * Once the page is done loading,
 * mount the app inside the container
 */
window.addEventListener('load', () => {
  const router = new VueRouter({routes})

  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!Session.isLoggedIn) {
        next('/')
      }
    } else {
      next()
    }
  })


  const app = new Vue({router, render: (h) => h(App)})
  app.$mount('#app')
})



