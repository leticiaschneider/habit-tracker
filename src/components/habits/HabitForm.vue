<template>
<div class="container">
    <div class="btn-back">
        <router-link :to="{ name: 'home' }" class="d-flex f-align-items">
            <img class="icon mr-10" src="@/assets/icons/angle-left-solid.svg" />
            <span>Back</span>
        </router-link>
    </div>

    <form v-on:submit="save($event)">
        <h2>Let's create new habit !</h2>
        <div class="form-control">
            <label for="name">Name</label>
            <div>
                <input type="text" name="name" v-model="habit.name" maxlength="200" minlength="3" />
            </div>
        </div>

        <div class="form-control mt-20">
            <label for="name">Frequency</label>
            <div class="d-flex wrap mt-15">
                <div class="item" v-for="freq in frequencyDays" :key="freq.name">
                    <input type="checkbox" :id="freq.name" name="daysOfWeekSelected" :value="freq.name" v-model="daysOfWeekSelected" />
                    <label :for="freq.name" :class="freq.name">
                        {{ freq.abbreviation }}
                    </label>
                </div>
            </div>
        </div>

        <div class="form-control mt-15">
            <label for="name">Color</label>
            <div class="d-flex wrap mt-15">
                <div class="item" v-for="color in colors" :key="color">
                    <input type="radio" :id="color" name="colors" :value="color" v-model="habit.picked" />
                    <label :for="color" :class="'c' + color"></label>
                </div>
            </div>
        </div>

        <div class="form-control mt-30 d-flex f-justify-end">
            <router-link :to="{ name: 'home' }">
                <button class="btn btn-secondary mr-15" type="button">Back</button>
            </router-link>
            <button v-if="!id" class="btn btn-primary" type="submit">Save</button>
            <button v-else class="btn btn-primary" type="button" @click="update($event)">
                Update
            </button>
        </div>
    </form>
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
            id: this.$route.params.id,
            colors: [
                "e48463",
                "e7a68c",
                "afb5a9",
                "646f58",
                "f8d941",
                "fd9f9d",
                "70b0b0",
            ],
            frequencyDays: [{
                    name: "sunday",
                    abbreviation: "Sun",
                },
                {
                    name: "monday",
                    abbreviation: "Mon",
                },
                {
                    name: "tuesday",
                    abbreviation: "Tue",
                },
                {
                    name: "wednesday",
                    abbreviation: "Wed",
                },
                {
                    name: "thursday",
                    abbreviation: "Thu",
                },
                {
                    name: "friday",
                    abbreviation: "Fri",
                },
                {
                    name: "saturday",
                    abbreviation: "Sat",
                },
            ],
            daysOfWeekSelected: [
                "sunday",
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
            ],
            habit: {
                name: "",
                picked: "e48463",
                daysOfHabit: [{
                        name: "sunday",
                        selected: false,
                        checked: false,
                    },
                    {
                        name: "monday",
                        selected: false,
                        checked: false,
                    },
                    {
                        name: "tuesday",
                        selected: false,
                        checked: false,
                    },
                    {
                        name: "wednesday",
                        selected: false,
                        checked: false,
                    },
                    {
                        name: "thursday",
                        selected: false,
                        checked: false,
                    },
                    {
                        name: "friday",
                        selected: false,
                        checked: false,
                    },
                    {
                        name: "saturday",
                        selected: false,
                        checked: false,
                    },
                ],
                habitsToComplete: 0,
                habitsCompleted: 0,
            },
        };
    },

    created() {
        if (this.id) {
            this.habit = this.$store.getters.habits.find(
                (item: any) => item.id == this.id
            );

            this.daysOfWeekSelected = [];
            this.habit.daysOfHabit.forEach((item: any) => {
                if (item.selected) {
                    this.daysOfWeekSelected.push(item.name);
                }
            });
        }
    },

    methods: {
        save(event: any) {
            event.preventDefault();

            let countSelected = 0;
            this.daysOfWeekSelected.forEach((day: any) => {
                this.habit.daysOfHabit.map((element: any) => {
                    if (day === element.name) {
                        element.selected = true;
                        countSelected++;
                    }
                });
            });
            this.habit.habitsToComplete = countSelected;
            this.habit.id = Math.random().toString(16).slice(2);
            this.habit.created = moment();

            this.$store.commit("addHabit", this.habit);

            this.$router.push({
                name: "home",
            });
        },

        update(event: any) {
            event.preventDefault();

            let countSelected = 0;

            this.habit.daysOfHabit.forEach((element: any) => {
                const item = this.daysOfWeekSelected.find((day: any) => day === element.name);
                element.selected = item ? true : false;
            });

            this.habit.habitsToComplete = countSelected;
            this.habit.created = moment();

            this.$store.commit("updateHabit", this.habit);

            this.$router.push({
                name: "home",
            });
        },
    },
})
export default class HabitForm extends Vue {}
</script>

<style lang="scss" scoped>
h2 {
    font-family: "Mulish", sans-serif;
    text-align: center;
    margin-top: 0;
    color: #dd6f3f;
}

.btn-back {
    a {
        text-decoration: none;
        color: #000;

        span {
            margin-top: 5px;
        }
    }
}

.container {
    margin: 0 auto;
    margin-top: 70px;

    form {
        background-color: #fbfbfb;
        padding: 35px;
        border-radius: 5px;
        box-shadow: 10px 9px 20px #b4b4b4;
    }
}

.item {
    height: 45px;
}

input[type="text"] {
    padding: 5px;
    outline: none;
    border-radius: 4px;
    border: 1px solid #b4b4b4;
    width: 100%;
}

/* checkbox css */
input[type="checkbox"] {
    display: none;
}

input[type="checkbox"]+label {
    cursor: pointer;
    background-color: #e5e5e5;
    padding: 8px 10px;
    margin-right: 5px;
    border-radius: 5px;
    border: 2px solid #dddddd;
    box-shadow: 1px 3px 7px #b4b4b4;
}

input[type="checkbox"]:checked+label {
    border: 2px solid #e89b72;
    background-color: #eeb08b;
}

/* radio css */
input[type="radio"] {
    display: none;
}

input[type="radio"]+label {
    padding: 1px 10px;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 15px;
    border: 2px solid #dddddd;
    box-shadow: 1px 3px 7px #b4b4b4;
}

input[type="radio"]:checked+label {
    border: 2px solid #4a4a4a;
}

/* Colors */
.ce48463 {
    background-color: #e48463;
}

.ce7a68c {
    background-color: #e7a68c;
}

.cafb5a9 {
    background-color: #afb5a9;
}

.c646f58 {
    background-color: #646f58;
}

.cf8d941 {
    background-color: #f8d941;
}

.cfd9f9d {
    background-color: #fd9f9d;
}

.c70b0b0 {
    background-color: #70b0b0;
}

@media screen and (max-width: 480px) {
    .container {
        padding: 0 20px;
    }
}

@media screen and (min-width: 481px) and (max-width: 768px) {
    .container {
        padding: 0 20px;
    }
}

@media screen and (min-width: 769px) {
    .container {
        max-width: 570px;
    }
}
</style>
