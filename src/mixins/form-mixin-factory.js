import {
    FORM_ACTIONS_SUBMIT,
    FORM_ACTIONS_CLEAR
} from '../store/form/action-types';
import FormErrors from '../components/FormErrors';

export default function(moduleName, data) {
    return {
        components: {
            FormErrors
        },
        data,
        methods: {
            submit() {
                this.$store.dispatch(moduleName + '/' + FORM_ACTIONS_SUBMIT, this.formData);
            }
        },
        computed: {
            errors() {
                return this.$store.state.login.errors;
            },
            message() {
                return this.$store.state.login.message;
            },
            pending() {
                return this.$store.getters['login/pending'];
            }
        },
        beforeCreate() {
            this.$store.dispatch(moduleName + '/' + FORM_ACTIONS_CLEAR);
        }
    }
}