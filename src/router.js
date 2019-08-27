import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/auth',
            name: 'auth',
            component: () => import(/* webpackChunkName: "guest" */ './views/ViewGuest.vue'),
            meta: {
                allow: ['guest']
            },
            children: [
                {
                    path: 'login',
                    name: 'login',
                    component: () => import(/* webpackChunkName: "login" */ './views/ViewLogin.vue')
                },
                {
                    path: 'registration',
                    name: 'registration',
                    component: () => import(/* webpackChunkName: "registration" */ './views/ViewRegistration.vue')
                }
            ]
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "user" */ './views/ViewUser.vue'),
            meta: {
                allow: ['user']
            },
            children: [
                {
                    path: '',
                    component: () => import(/* webpackChunkName: "user" */ './views/ViewCalendar.vue'),
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

export default router;