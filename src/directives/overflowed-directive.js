import Vue from 'vue';

export default Vue.directive('overflowed', {
    componentUpdated(el) {
        if (el.scrollHeight > el.clientHeight) {
            el.classList.add('overflowed');
        } else {
            el.classList.remove('overflowed');
        }
    }
});
