import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const isAuth = false;

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'root',
      get component() {
        if (isAuth) {
          return () => import(/* webpackChunkName: "user" */ './views/ViewUser.vue');
        } else {
          return () => import(/* webpackChunkName: "guest" */ './views/ViewGuest.vue');
        }
      },
      children: [
        {
          name: 'registration',
          path: 'registration',
          component: () => 
            import(/* webpackChunkName: "registration" */ './views/ViewRegistration.vue')
        },
        {
          name: 'home',
          path: '',
          get component() {
            if (isAuth) {
              return () => import(/* webpackChunkName: "login" */ './views/ViewCalendar.vue')
            } else {
              return () => import(/* webpackChunkName: "login" */ './views/ViewLogin.vue')
            }
          },
          children: [
            {
              name: 'year',
              path: 'year',
              component: () => 
                import(/* webpackChunkName: "year" */ './views/ViewYear.vue')
            },
            {
              name: 'month',
              path: 'month',
              component: () => 
                import(/* webpackChunkName: "month" */ './views/ViewMonth.vue')
            },
            {
              name: 'day',
              path: 'day',
              component: () => 
                import(/* webpackChunkName: "day" */ './views/ViewDay.vue')
            },
            {
              name: 'week',
              path: '',
              alias: 'week',
              component: () => 
                import(/* webpackChunkName: "week" */ './views/ViewWeek.vue')
            }
          ]
        }
      ]
    }
  ]
})
