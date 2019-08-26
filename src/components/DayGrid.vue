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
    @import '../styles/variables.scss';
    .step {
        $border: 1px solid #f0f0f0;
        border-top: $border;
    }
</style>