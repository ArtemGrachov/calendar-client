<template>
    <div>
        <UserHeader></UserHeader>
        <CalendarNav></CalendarNav>
        <router-view></router-view>
    </div>
</template>

<script>
import UserHeader from '../components/UserHeader';
import CalendarNav from '../components/CalendarNav';

export default {
    components: {
        UserHeader,
        CalendarNav
    }
}
</script>

<style lang="scss" scoped>

</style>