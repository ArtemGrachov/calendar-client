import Vue from 'vue'
import Vuex from 'vuex'
import login from './login/store';
import user from './user/store';
import registration from './registration/store';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        login,
        user,
        registration
    }
})
