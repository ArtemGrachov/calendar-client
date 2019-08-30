<template>
    <div class="user d-flex align-items-center">
        <UserAvatar :user="user" class="mr-2"></UserAvatar>
        <strong>
            {{ user.firstname }} {{ user.lastname }}
        </strong>
    </div>
</template>

<script>
import UserAvatar from './UserAvatar';

export default {
    components: {
        UserAvatar
    },
    props: {
        user: Object
    }
}
</script>
