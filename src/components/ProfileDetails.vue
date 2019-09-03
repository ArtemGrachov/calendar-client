<template>
    <div class="profile">
        <div class="avatar mb-3" v-if="user.avatarUrl">
           <img :src="user.avatarUrl"/>
        </div>
        <div class="title mb-3">
            {{ user.firstname }} {{ user.lastname }}
        </div>
        <div class="email">
            Email: {{ user.email }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        user: Object
    }
}
</script>