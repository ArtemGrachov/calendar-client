<template>
    <div class="controls">
        <button
            class="button-transparent button-green button-flat px-0"
            @click="invite()"
            v-if="role === 'user'"
        >
            Invite
        </button>
        <button
            class="button-transparent button-red button-flat px-0"
            @click="remove()"
            v-else-if="role === 'member'"
        >
            Remove
        </button>
        <div v-else-if="role === 'owner'" class="important">
            Owner
        </div>
    </div>
</template>

<script>
import Modal from '../modal';
import ModalConfirmation from './ModalConfirmation';

export default {
    props: {
        user: Object,
        event: Object
    },
    computed: {
        role() {
            const userId = this.user.id;
            const owner = this.event.owner === userId;
            
            if (owner) {
                return 'owner';
            }

            const member = Boolean(this.event.users.find(id => id === userId));

            if (member) {
                return 'member';
            }

            return 'user';
        }
    },
    methods: {
        invite() {
            this.$emit('invite');
        },
        async remove() {
            const confirmation = await Modal.openModal({
                data: {
                    question: 'Are you sure you want to remove this user from event?'
                },
                component: ModalConfirmation
            });

            if (confirmation) {
                this.$emit('remove');
            }
        }
    }
}
</script>