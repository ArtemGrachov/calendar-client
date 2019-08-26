<template>
    <div>
        <div
            class="step"
            :style="{ height }"
            v-for="step in steps"
            :key="step"
        >

        </div>
    </div>
</template>

<script>
import timeTableMixin from '../mixins/time-table-mixin';

export default {
    mixins: [timeTableMixin]
}
</script>

<style lang="scss" scoped>
    .step {
        border: 1px solid red;
        margin: 1px;
    }
</style>