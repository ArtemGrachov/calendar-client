<template>
    <div id="app">
        <h1>Hello, world</h1>
        <router-link to="/auth/login">login</router-link>
        <router-link to="/month">month</router-link>
        <router-link to="/day">day</router-link>
        <hr />
        <router-view></router-view>
    </div>
</template>

<style lang="scss">
</style>
