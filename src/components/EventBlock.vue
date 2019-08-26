<template>
    <div
        class="event"
        :style="{ borderColor: event.color }"
    >
        <div class="event-time">
            {{ event.start | moment('HH:mm') }}
            {{ event.end | moment('HH:mm') }}
        </div>
        <div class="event-title">
            {{ event.title }}
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
        border-top: 4px solid black;
        border-bottom: 4px solid black;
        padding: $space;
        border-radius: $borderRadius;
        box-shadow: $shadow;
        text-align: center;
        font-size: 14px;

        &-time {
            font-size: 12px;
            color: #8e8e8e;
            margin-bottom: $space;
        }

        &-title {
            margin: auto;
            text-align: center;
            font-weight: bold;
        }

        &.small {
            font-size: 12px;

            .event {
                &-time {
                    margin-bottom: 0;
                }
            }
        }
    }
</style>