import Vue from 'vue'
import Router from 'vue-router'
import store from './store';
import { USER_ACTIONS_GET_STORAGE_TOKENS, USER_ACTIONS_GET_OWN_DATA } from './store/user/action-types';

Vue.use(Router)

let isAuth = false;
let resolve;

const promise = new Promise(res => resolve = res);

store.watch(
  (state, getters) => getters['user/isAuthorized'],
  auth => isAuth = auth
)

store
  .dispatch('user/' + USER_ACTIONS_GET_STORAGE_TOKENS)
  .then(() => {
    if (isAuth) {
      console.log('GET DATA')
      return store
        .dispatch('user/' + USER_ACTIONS_GET_OWN_DATA)
        .then(() => resolve())
    } else {
      resolve();
    }
  })
  .catch(() => resolve())

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'root',
      get component() {
        console.log('called get component');
        if (isAuth) {
          console.log('user')
          return () => import(/* webpackChunkName: "user" */ './views/ViewUser.vue');
        } else {
          console.log('guest')
          return () => import(/* webpackChunkName: "guest" */ './views/ViewGuest.vue');
        }
      },
      beforeEnter(to, from, next) {
        setTimeout(() => {
          promise.then(() => next());
        }, 3000);
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
                import(/* webpackChunkName: "year" */ './views/ViewYear.vue'),
              meta: { requireAuth: true }
            },
            {
              name: 'month',
              path: 'month',
              component: () => 
                import(/* webpackChunkName: "month" */ './views/ViewMonth.vue'),
              meta: { requireAuth: true }
            },
            {
              name: 'day',
              path: 'day',
              component: () => 
                import(/* webpackChunkName: "day" */ './views/ViewDay.vue'),
              meta: { requireAuth: true }
            },
            {
              name: 'week',
              path: '',
              alias: 'week',
              component: () => 
                import(/* webpackChunkName: "week" */ './views/ViewWeek.vue'),
              meta: { requireAuth: true }
            }
          ]
        }
      ]
    }
  ]
})

export default router;