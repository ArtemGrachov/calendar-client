<template>
    <div id="app" class="wrapper">
        <router-view></router-view>
        <ModalRoot></ModalRoot>
    </div>
</template>

<script>
import ModalRoot from './components/ModalRoot';

export default {
    components: {
        ModalRoot
    }
}
</script>

<style lang="scss">
</style>
