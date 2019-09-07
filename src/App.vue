<template>
    <div id="app" class="wrapper">
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
    }
}
</script>

<style lang="scss">
</style>
