<template>
    <nav class="nav py-2 px-3">
        <div class="container d-flex">
            <button class="button button-success mr-auto">Go today</button>
            <router-link to="day" class="button button-transparent mx-1">Day</router-link>
            <router-link to="week" class="button button-transparent mx-1">Week</router-link>
            <router-link to="month" class="button button-transparent mx-1">Month</router-link>
            <router-link to="year" class="button button-transparent mx-1">Year</router-link>
        </div>
    </nav>
</template>

