<template>
    <form>
        <div class="mb-3">
            <label class="mb-2" for="email">Email</label>
            <input type="email" name="email" id="email">
        </div>
        <div class="mb-3">
            <label class="mb-2" for="password">Password</label>
            <input type="password" name="password" id="password">
        </div>
        <div class="mb-3">
            <label class="mb-2" for="passwordConfirmation">Password confirmation</label>
            <input type="password" name="passwordConfirmation" id="passwordConfirmation">
        </div>
        <div class="mb-3">
            <label class="mb-2" for="firstname">First name</label>
            <input type="text" id="firstname" name="firstname">
        </div>
        <div class="mb-3">
            <label class="mb-2" for="lastname">Last name</label>
            <input type="text" id="lastname" name="lastname">
        </div>
        <button type="submit">Create account</button>
    </form>
</template>

<script>
export default {

}
</script>