import Vue from 'vue'
import Vuex from 'vuex'
import login from './login/store';
import user from './user/store';
import registration from './registration/store';
import events from './events/store';
import editEvent from './edit-event/store';
import alerts from './alerts/store';
import notifications from './notifications/store';
import usersSearch from './users-search/store';
import users from './users/store';
import editProfile from './edit-profile/store';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        login,
        user,
        registration,
        events,
        editEvent,
        alerts,
        notifications,
        usersSearch,
        users,
        editProfile
    }
})
