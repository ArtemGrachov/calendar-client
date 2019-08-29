import Vue from 'vue';

export default new Vue({
    data() {
        return {
            counter: 0,
            modals: []
        }
    },
    methods: {
        openModal(modal) {
            this.counter++;
            let resolve, reject;

            const promise = new Promise(
                (res, rej) => {
                    resolve = res;
                    reject = rej;
                }
            );

            this.modals.push({
                ...modal,
                id: this.counter,
                resolve,
                reject,
                close: id => this.closeModal(id)
            })

            return promise;
        },
        closeModal(modalId) {
            this.modals = this.modals.filter(modal => modal.id !== modalId);
        }
    }
});
