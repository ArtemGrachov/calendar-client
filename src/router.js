import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'root',
      get component() {
        const isAuth = false;

        if (isAuth) {
          return () => import(/* webpackChunkName: "user" */ './views/ViewUser.vue');
        } else {
          return () => import(/* webpackChunkName: "guest" */ './views/ViewGuest.vue');
        }
      },
      children: [
        {
          path: 'registration',
          component: () => 
            import(/* webpackChunkName: "registration" */ './views/ViewRegistration.vue')
        }
      ]
    }
  ]
})
