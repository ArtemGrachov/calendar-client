export default {
    props: {
        data: Object
    },
    methods: {
        close() {
            this.$emit('close');
        },
        resolve(data) {
            this.$emit('resolve', data);
        },
        reject(data) {
            this.$emit('reject', data);
        }
    }
}