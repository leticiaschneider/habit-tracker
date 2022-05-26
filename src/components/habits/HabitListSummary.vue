<template>
<div v-if="allHabitsSummary.length > 0">
    <h3 class="summaryTitle">What do you have for today?</h3>

    <div class="summary-wrap">
        <template v-for="habit in activeHabits">
            <template v-for="today in habit.daysOfHabit">
                <div :key="today" v-if="today.isToday" class="habitsSummary d-flex">
                    <div v-if="today.checked" class="sideColor" :class="today.checked ? 'c' + habit.picked : ''"></div>
                    <div class="fit-width">
                        <div class="d-flex f-justify-between">
                            <span class="ellipsis">{{ habit.name }}</span>

                            <div class="mr-10">
                                <router-link :to="{ name: 'update', params: { id: habit.id } }">
                                    <img class="icon mr-10" src="@/assets/icons/pencil-solid.svg" />
                                </router-link>

                                <img class="icon" src="@/assets/icons/trash-can-solid.svg" @click="remove(habit)" />
                            </div>
                        </div>

                        <div v-if="today.isToday && !today.checked" class="fit-width">
                            <button class="btn btn-primary btn-mark mt-15" type="button" @click="verify('check', habit)">
                                Mark Complete
                            </button>
                        </div>
                        <div class="d-flex f-justify-between f-align-items" style="margin-top: 15px" v-if="today.isToday && today.checked">
                            <span class="d-flex f-align-items">
                                <img class="checkIcon" src="@/assets/icons/check-solid.svg" />
                                completed
                            </span>
                            <span class="undo" @click="verify('checked', habit)">undo</span>
                        </div>
                    </div>
                </div>
            </template>
        </template>
    </div>

    <pagination :offset="offset" :total="total" :limit="limit" @change-page="changePage" />
</div>
</template>

<script lang="ts">
import {
    Options,
    Vue
} from "vue-class-component";

import moment from "moment/moment";
import Pagination from "../shared/Pagination.vue";

@Options({
    components: {
        Pagination,
    },

    data() {
        return {
            allHabitsSummary: [],
            habitsSummary: [],
            today: moment().day(),
            daysOfWeek: [
                "sunday",
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
            ],
            offset: 0,
            total: 0,
            limit: 4,
            currentPage: 1,
        };
    },

    computed: {
        activeHabits() {
            this.allHabitsSummary = this.$store.getters.habits;
            this.changePage(this.currentPage);
            return this.habitsSummary;
        }
    },

    created() {
        let hoje = moment().day();
        this.allHabitsSummary = this.$store.getters.habits;
        this.total = this.allHabitsSummary.length;
        this.allHabitsSummary.map((element: any) => {
            element.daysOfHabit.map((day: any) => {
                day.isToday =
                    day.name === this.daysOfWeek[this.today] && day.selected ? true : false;
            });
        });

        this.changePage();
    },
    methods: {
        verify(check: string, habit: any) {
            let today = this.daysOfWeek[this.today];

            habit.daysOfHabit.map((element: any) => {

                if (check == "check") {
                    element.checked = element.name === today ? true : element.checked;
                } else {
                    element.checked = element.name === today ? false : element.checked;
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
            this.habitsSummary = this.allHabitsSummary.slice(this.offset - this.limit, this.offset);
        },
    },
})
export default class HabitListSummary extends Vue {}
</script>

<style lang="scss" scoped>
.summaryTitle {
    font-family: "Mulish", sans-serif;
    text-align: center;
    color: #dd6f3f;
}

.habitsSummary {
    background: #fff;
    border: 1px solid #cecece;
    border-radius: 15px;
    padding: 15px 10px 15px 20px;
    margin-bottom: 15px;
    width: 230px;

    .fit-width {
        width: 100%;
    }

    .btn-mark {
        width: 96%;
    }

    .checkIcon {
        width: 15px;
        margin-right: 5px;
    }

    .sideColor {
        width: 19px;
        margin-right: 15px;
    }

    .undo {
        margin-right: 8px;
        cursor: pointer;
    }

}

// colors
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

@media screen and (max-width: 1024px) {
    .summary-wrap {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }
}

@media screen and (min-width: 1025px) {
    .summary-wrap {
        margin: 0 auto;
        width: fit-content;
    }
}
</style>
