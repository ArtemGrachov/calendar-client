<template>
    <ul class="errors p-3">
        <li
            class="mb-2"
            v-for="(error, index) in errors"
            v-bind:key="index"
        >
            {{ error }}
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        errors: Array
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/common.scss';

    .errors {
        @extend %list;
        background: #faf6f7;
        border-radius: $borderRadius * 2;
        letter-spacing: .05em;

        &>li {
            color: #962446;

            &:last-child {
                margin-bottom: 0 !important;
            }
        }
    }
</style>