<template>
<div class="scroll">
    <table cellspacing="0" cellpadding="10" width="100%">
        <thead>
            <tr>
                <td></td>
                <td></td>
                <td>Sun</td>
                <td>Mon</td>
                <td>Tue</td>
                <td>Wed</td>
                <td>Thu</td>
                <td>Fri</td>
                <td>Sat</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="habit in activeHabits" :key="habit.id">
                <td>
                    <div class="color" :class="'c' + habit.picked"></div>
                </td>

                <td>
                    <span class="ellipsis">{{ habit.name }}</span>
                </td>

                <td v-for="days in habit.daysOfHabit" :key="days">
                    <div v-if="days.selected">
                        <div v-if="days.checked" class="checked" :class="'c' + habit.picked" @click="verify('checked', habit, days)"></div>
                        <div v-else class="check" @click="verify('check', habit, days)"></div>
                    </div>
                    <div v-else>
                        <img class="noCheck" src="@/assets/icons/circle-xmark-solid.svg" />
                    </div>
                </td>

                <td>
                    <span class="no-break">
                        {{ habit.habitsCompleted }} / {{ habit.habitsToComplete }}
                    </span>
                </td>

                <td>
                    <router-link :to="{ name: 'update', params: { id: habit.id } }">
                        <img class="icon" src="@/assets/icons/pencil-solid.svg" />
                    </router-link>
                </td>

                <td>
                    <img class="icon" src="@/assets/icons/trash-can-solid.svg" @click="remove(habit)" />
                </td>
            </tr>
        </tbody>
    </table>

    <div class="no-data" v-if="allHabits.length == 0">
        <img src="@/assets/images/nodata.png" />
        <p>No data at the moment</p>
    </div>
</div>
<pagination v-if="allHabits.length > 0" :offset="offset" :total="total" :limit="limit" @change-page="changePage" />
</template>

<script lang="ts">
import {
    Options,
    Vue
} from "vue-class-component";
import Pagination from "../shared/Pagination.vue";

@Options({
    components: {
        Pagination,
    },

    data() {
        return {
            allHabits: [],
            habits: [],
            offset: 0,
            total: 0,
            limit: 6,
            currentPage: 1,
        };
    },

    computed: {
        activeHabits() {
            this.allHabits = this.$store.getters.habits;
            this.changePage(this.currentPage);
            return this.habits;
        },
    },

    created() {
        this.allHabits = this.$store.getters.habits;
        this.total = this.allHabits.length;
        this.changePage();
    },

    methods: {
        verify(check: string, habit: any, day: any) {
            habit.daysOfHabit.map((element: any) => {
                if (day.name === element.name) {
                    element.checked = check == "check" ? true : false;
                }
            });

            habit.habitsCompleted = habit.daysOfHabit.filter(
                (item: any) => item.checked
            ).length;

            this.$store.commit("updateHabit", habit);
        },

        remove(habit: any) {
            this.$store.commit("removeHabit", habit);
            this.allHabits = this.$store.getters.habits;
            this.changePage(this.currentPage);
        },

        changePage(currentPage: any) {
            this.currentPage = currentPage = currentPage ? currentPage : 0;
            this.offset = (currentPage + 1) * this.limit;
            this.habits = this.allHabits.slice(this.offset - this.limit, this.offset);
        },
    },
})
export default class HabitList extends Vue {}
</script>

<style lang="scss" scoped>
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

.color {
    width: 10px;
    height: 10px;
    border-radius: 20px;
}

.check {
    height: 20px;
    width: 20px;
    background-color: #dddddd;
    border-radius: 50px;
}

.checked {
    height: 20px;
    width: 20px;
    border-radius: 50px;
}

.noCheck {
    width: 22px;
    padding-top: 4px;
}

.scroll {
    overflow-x: auto;
    padding: 0 20px;
}

table {
    border-collapse: separate;
    border-spacing: 0 20px;

    tbody tr {
        border-radius: 10px;
        box-shadow: 2px 5px 15px #c2c2c287;

        >td {
            background-color: #fff;
        }
    }

    td:first-child,
    th:first-child {
        border-radius: 10px 0 0 10px;
    }

    td:last-child,
    th:last-child {
        border-radius: 0 10px 10px 0;
    }

    .no-break {
        white-space: nowrap;
    }
}

.no-data {
    text-align: center;

    img {
        width: 150px;
    }
}
</style>
