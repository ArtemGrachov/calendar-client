import Vue from 'vue'
import App from './App.vue'
import VueMoment from 'vue-moment';
import Croppa from 'vue-croppa';
import Vuelidate from 'vuelidate';
import router from './router';
import store from './store';
import { axios } from './api';
import RouterGuard from './router-guard';
import WebSocketClient from './socket';
import AuthInterceptor from './auth-interceptor';
import './styles/main.scss';

Vue.config.productionTip = false

new AuthInterceptor(axios, store);

const webSocketClient = new WebSocketClient(process.env.VUE_APP_WS_DOMAIN, store);

const guard = new RouterGuard(
    router,
    store,
    webSocketClient,
    {
        'guest': '/auth/login',
        'user': '/'
    }
);

guard.init();

Vue.use(VueMoment);
Vue.use(Croppa);
Vue.use(Vuelidate);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
