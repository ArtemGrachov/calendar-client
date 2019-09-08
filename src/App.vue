<template>
    <div id="app" class="wrapper">
        <div class="preloader app-preloader m-auto" v-if="!initialized"></div>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <ModalRoot></ModalRoot>
        <AlertsRoot></AlertsRoot>
    </div>
</template>

<script>
import ModalRoot from './components/ModalRoot';
import AlertsRoot from './components/AlertsRoot';

export default {
    components: {
        ModalRoot,
        AlertsRoot
    },
    computed: {
        initialized() {
            return this.$store.state.app.initialized
        }
    }
}
</script>

<style lang="scss">
</style>
