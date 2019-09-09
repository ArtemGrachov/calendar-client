<template>
    <div class="event-details">
        <div class="mb-5 px-3">
            <div class="title">
                <span
                    class="em"
                    :class="icon.class"
                    v-if="event.icon"
                >
                    
                </span>
                {{ event.title }}
            </div>
        </div>
        <div class="mb-3 px-3" v-if="!diffDates">
            <div class="date date-lg">
                <span class="date-inner">
                    {{ event.start | moment('MMMM D, YYYY') }}
                </span>
            </div>
        </div>
        <div class="row mb-5">
            <div class="col-12 col-sm-6">
                <div class="date px-3" v-if="diffDates">
                    <span class="date-inner">
                        {{ event.start | moment('MMMM, DD') }}
                    </span>
                </div>
                <div class="time">
                    {{ event.start | moment('HH:mm') }}
                </div>
            </div>
            <div class="col-12 col-sm-6">
                <div class="date px-3" v-if="diffDates">
                    <span class="date-inner">
                        {{ event.end | moment('MMMM, DD') }}
                    </span>
                </div>
                <div class="time">
                    {{ event.end | moment('HH:mm') }}
                </div>
            </div>
        </div>
        <div class="mb-3 px-3 py-4 border-y description content" v-if="event.description">
            {{ event.description }}
        </div>
        <div class="mb-4" v-if="users.length">
            <div class="mb-2 px-3 title-sm">
                Participants:
            </div>
            <div class="px-2">
                <div class="participant m-1 p-2">
                    <UserBlock :user="owner"></UserBlock>
                    <div class="participant-label">
                        <div class="participant-label-wrap">
                            owner
                        </div>
                    </div>
                </div>
                <div
                    class="participant m-1 p-2"
                    v-for="user in users"
                    :key="user.id"
                >
                    <UserBlock
                        :user="user"
                    ></UserBlock>
                </div>
            </div>
        </div>
        <div class="mt-5 text-right border-top px-3 py-2">
            <button
                class="button-red m-2"
                @click="leave"
                v-if="!iAmOnwer"
            >
                Leave
            </button>
            <button
                class="m-2"
                @click="invite"
                v-if="iAmOnwer"
            >
                Invite
            </button>
            <button
                class="button-yellow m-2"
                @click="edit"
                v-if="iAmOnwer"
            >
                Edit
            </button>
            <button
                class="button-red m-2"
                @click="deleteEvent"
                v-if="iAmOnwer"
            >
                Delete
            </button>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import icons from '../config/icons';
import UserBlock from './UserBlock';
import Modal from '../modal';
import ModalConfirmation from './ModalConfirmation';

export default {
    components: {
        UserBlock
    },
    props: {
        event: Object
    },
    computed: {
        diffDates() {
            return moment(this.event.start).format('DD.MM.YYYY') !==
                moment(this.event.end).format('DD.MM.YYYY');
        },
        icon() {
            return icons.find(icon => icon.name === this.event.icon);
        },
        users() {
            return this.$store.getters['users/byIds'](this.event.users);
        },
        owner() {
            return this.$store.getters['users/byId'](this.event.owner);
        },
        iAmOnwer() {
            return this.$store.getters['events/iAmOwner'](this.event);
        }
    },
    methods: {
        edit() {
            this.$emit('edit');
        },
        async deleteEvent() {
            const confirmation = await Modal.openModal({
                data: {
                    question: 'Are you sure you want to delete this event?'
                },
                component: ModalConfirmation
            });

            if (confirmation) {
                this.$emit('delete');
            }
        },
        leave() {
            this.$emit('leave');
        },
        invite() {
            this.$emit('invite');
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/variables';

    .date {
        color: $grey;
        text-align: center;
        letter-spacing: $letterSpacing;
        font-weight: bold;

        &-lg {
            font-size: 20px;
        }

        &-inner {
            border-bottom: 1px dotted $lightgrey;
        }
    }

    .time {
        text-align: center;
        color: $blue;
        font-size: 18px;
    }

    .description {
        background: $background;
    }

    .participant {
        background: $background;
        border-radius: $borderRadius;
        position: relative;
        display: inline-block;

        &-label {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            text-align: center;
            font-size: 10px;
            color: $grey;
            margin-top: -6px;

            &-wrap {
                padding: 2px 10px;
                line-height: 1;
                border-radius: 5px;
                display: inline-block;
                background: white;
                border: 1px solid $lightgrey;
            }
        }
    }
</style>
