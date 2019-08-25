<template>
    <div class="event">
        <div class="event-title">
            {{event.title}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        event: Object
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/variables';

    .event {
        padding: $space;
        border-radius: $borderRadius;
        box-shadow: $shadow;
        text-align: center;
        font-size: 14px;
    }
</style>