<template>
    <form>
        <div>
            <label for="email">Email</label>
            <input type="email" name="email" id="email">
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" name="password" id="password">
        </div>
        <div>
            <label for="passwordConfirmation">Password confirmation</label>
            <input type="password" name="passwordConfirmation" id="passwordConfirmation">
        </div>
        <div>
            <label for="firstname">First name</label>
            <input type="text" id="firstname" name="firstname">
        </div>
        <div>
            <label for="lastname">Last name</label>
            <input type="text" id="lastname" name="lastname">
        </div>
        <button type="submit">Registration</button>
    </form>
</template>

<script>
export default {

}
</script>