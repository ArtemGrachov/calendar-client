import Vue from 'vue'
import App from './App.vue'
import VueMoment from 'vue-moment';
import Croppa from 'vue-croppa';
import router from './router'
import store from './store'
import RouterGuard from './router-guard';
import './styles/main.scss';

Vue.config.productionTip = false

const guard = new RouterGuard(
    router,
    store,
    {
        'guest': '/auth/login',
        'user': '/'
    }
)

guard.init();

Vue.use(VueMoment);
Vue.use(Croppa);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
