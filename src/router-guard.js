import {
    USER_ACTIONS_GET_STORAGE_TOKENS,
    USER_ACTIONS_GET_OWN_DATA
} from "./store/user/action-types";

export default class RouterGuard {
    isAuth = false;

    initialized = false;

    initPromise = null;

    resolveInitPromise = null;

    constructor(router, store, redirects) {
        this.router = router;
        this.store = store;
        this.redirects = redirects;

        this.initPromise = new Promise(res => {
            this.initialized = true
            this.resolveInitPromise = res;
        });
    }

    init() {
        this.store.watch(
            (state, getters) => getters['user/isAuthorized'],
            auth => {
                this.isAuth = auth;
                if (this.initialized) {
                    const redirect = this.checkRouteAccess(this.router.currentRoute);
                    if (redirect) {
                        this.router.push(redirect);
                    }
                }
            }
        );

        this.store
            .dispatch('user/' + USER_ACTIONS_GET_STORAGE_TOKENS)
            .then(() => {
                if (this.isAuth) {
                    return this.store
                        .dispatch('user/' + USER_ACTIONS_GET_OWN_DATA)
                        .then(() => this.resolveInitPromise())
                        .catch(() => {
                            this.isAuth = false;
                            this.resolveInitPromise();
                        })
                } else {
                    this.resolveInitPromise();
                }
            })
            .catch(() => this.resolveInitPromise())


        this.router.beforeEach((to, from, next) => {
            this.initPromise.then(() => {
                const redirect = this.checkRouteAccess(to);
                if (redirect) {
                    next(redirect);
                } else {
                    next();
                }
            });
        })
    }

    checkRouteAccess(to) {
        const userGroup = this.isAuth ? 'user' : 'guest';
        const matched = to.matched;

        let allowGroups;

        for (let i = 0; i < matched.length; i++) {
            const meta = matched[i].meta;

            if (meta && meta.allow) {
                allowGroups = meta.allow;
                break;
            }
        }
        if (allowGroups) {
            const allow = allowGroups.indexOf(userGroup) !== -1;
            return allow ? null : this.redirects[userGroup];
        }

        return null;
    }
}