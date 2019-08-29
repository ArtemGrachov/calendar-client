<template>
    <div
        class="event"
        :style="{ borderColor: event.color }"
    >
        <a
            class="details-link"
            href="#"
            @click.prevent="openDetails"
        >
            <div class="event-time">
                {{ event.start | moment('HH:mm') }}
                {{ event.end | moment('HH:mm') }}
            </div>
            <div class="event-title">
                {{ event.title }}
            </div>

        </a>
    </div>
</template>

<script>
import Modal from '../modal';
import ModalEventDetails from './ModalEventDetails';

export default {
    props: {
        event: Object
    },
    methods: {
        openDetails() {
            Modal.openModal({
                component: ModalEventDetails,
                data: this.event.id
            });
        }
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
    }

    .details-link {
        color: black;
    }
</style>