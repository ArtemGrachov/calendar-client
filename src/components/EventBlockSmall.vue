<template>
    <div
        class="event p-1 d-flex justify-content-between"
        :style="{ borderColor: event.color }"
        @click.prevent="openDetails"
    >
        <div class="event-time mr-3">
            {{ event.start | moment('HH:mm') }}
        </div>
        <div class="event-title">
            <span
                class="em event-icon"
                :class="icon.class"
                v-if="event.icon"
            ></span>
            {{ event.title }}
        </div>
    </div>
</template>

<script>
import eventBlockMixin from '../mixins/event-block-mixin';

export default {
    mixins: [eventBlockMixin]
}
</script>

<style lang="scss" scoped>
    @import '../styles/variables';

    .event {
        border-top: 2px solid $lightgrey;
        border-bottom: 2px solid $lightgrey;
        border-radius: $borderRadius;
        box-shadow: $shadow;
        text-align: center;
        font-size: 12px;
        overflow: hidden;

        &-time {
            color: $grey;
            font-weight: normal;
        }

        &-title {
            text-align: center;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }

        &-icon {
            width: 1em;
            height: 1em;
            vertical-align: top;
        }
    }
</style>