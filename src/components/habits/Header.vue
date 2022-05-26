<template>
<div class="d-flex f-align-items f-justify-between">
    <h2>{{ greetingsText }}!</h2>

    <router-link :to="{ name: 'create' }">
        <button class="btn btn-primary" type="button">+ Add Habit</button>
    </router-link>
</div>
</template>

<script lang="ts">
import {
    Options,
    Vue
} from "vue-class-component";
import moment from "moment/moment";

@Options({
    data() {
        return {
            greetingsText: "",
        };
    },

    created() {
        if (
            moment().isBetween(
                moment("00:01:00", "HH:mm:ss"),
                moment("11:59:59", "HH:mm:ss")
            )
        ) {
            this.greetingsText = "Good Morning";
        } else if (
            moment().isBetween(
                moment("12:00:00", "HH:mm:ss"),
                moment("15:59:59", "HH:mm:ss")
            )
        ) {
            this.greetingsText = "Good Afternoon";
        } else if (
            moment().isBetween(
                moment("16:00:00", "HH:mm:ss"),
                moment("23:59:59", "HH:mm:ss")
            )
        ) {
            this.greetingsText = "Good Evening";
        }
    },
})
export default class Header extends Vue {}
</script>