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
                this.sendForm(this.formData);
            },
            sendForm(data, options) {
                this.$store.dispatch(
                    moduleName + '/' + FORM_ACTIONS_SUBMIT,
                    { data, options }
                );
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
                return this.$store.state[moduleName].errors;
            },
            message() {
                return this.$store.state[moduleName].message;
            },
            pending() {
                return this.$store.getters[moduleName + '/pending'];
            },
            formData() {
                return this.$data.form
            }
        },
        beforeCreate() {
            this.$store.dispatch(moduleName + '/' + FORM_ACTIONS_CLEAR);
        }
    }
}