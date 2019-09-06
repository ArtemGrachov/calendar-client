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
            },
            fileOnChange(event, form) {
                const fieldName = event.target.name;
                const files = event.target.files || event.dataTransfer.files;
                const multiple = event.target.multiple;

                if (!files || !files.length) {
                    form[fieldName] = null;
                } else {
                    form[fieldName] = multiple ? files : files[0];
                }
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
                return this.$store.getters[moduleName + '/pending'];
            }
        },
        beforeCreate() {
            this.$store.dispatch(moduleName + '/' + FORM_ACTIONS_CLEAR);
        }
    }
}