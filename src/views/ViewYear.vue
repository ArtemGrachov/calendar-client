<template>
    <div>
        <h2>Year</h2>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    props: {
        date: {
            validator: value => value.constructor.name === 'Moment'
        }
    },
}
</script>
