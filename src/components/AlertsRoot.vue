<template>
    <div class="alerts-root p-4" v-if="alerts.length">
        <AlertBlock
            class="mb-3"
            v-for="alert in alerts"
            :key="alert.id"
            :alert="alert"
            @close="close(alert.id)"
        ></AlertBlock>
    </div>
</template>

<script>
import { ALERTS_ACITONS_DELETE_ALERT } from '../store/alerts/action-types';
import AlertBlock from './AlertBlock';

export default {
    components: {
        AlertBlock
    },
    computed: {
        alerts() {
            return this.$store.state.alerts.items;
        }
    },
    methods: {
        close(alertId) {console.log(alertId)
            this.$store.dispatch('alerts/' + ALERTS_ACITONS_DELETE_ALERT, { id: alertId });
        }
    }
}
</script>

<style lang="scss" scoped>
    .alerts-root {
        position: fixed;
        bottom: 0;
        right: 0;
        width: 100%;
        max-width: 370px;
        z-index: 200;
    }
</style>