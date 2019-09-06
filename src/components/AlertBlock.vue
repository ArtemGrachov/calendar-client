<template>
    <div class="alert py-3 px-4" :class="alert.type">
        <div class="alert-title mb-3">
            {{ alert.title }}
            <button
                class="button-link button-round alert-close mt-n1"
                @click="close"
            >
                <i class="material-icons">
                    clear
                </i>
            </button>
        </div>
        <div class="alert-description">
            {{ alert.description }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        alert: Object
    },
    methods: {
        close() {
            this.$emit('close');
        }
    },
}
</script>

<style lang="scss" scoped>
    .alert {
        background: rgba(black, .25);
        color: white;

        &-title {
            font-weight: bold;
            font-size: 16px;
        }

        &-close {
            float: right;
            color: white;
        }

        &.success {
            background: rgba(lime, .75);
        }

        &.info {
            background: rgba(blue, .45);
        }

        &.danger {
            background: rgba(red, .45);
        }

        &.warning {
            background: rgba(orangered, .45);
        }
    }
</style>