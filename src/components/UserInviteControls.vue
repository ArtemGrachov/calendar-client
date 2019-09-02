<template>
    <div class="controls">
        <button
            class="button-flat"
            @click="invite()"
            v-if="role === 'user'"
        >
            Invite
        </button>
        <button
            class="button-flat"
            @click="remove()"
            v-else-if="role === 'member'"
        >
            Remove
        </button>
        <div v-else-if="role === 'owner'">
            Owner
        </div>
    </div>
</template>

<script>
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
        remove() {
            this.$emit('remove');
        }
    }
}
</script>