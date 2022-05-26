<template>
<div class="header">
    <Header />
</div>

<div class="container d-flex wrap-reverse">
    <div class="content flex-item">
        <HabitList />
    </div>

    <div class="flex-item summary mt-20">
        <HabitListSummary />
    </div>
</div>
</template>

<script lang="ts">
import {
    Options,
    Vue
} from "vue-class-component";

import Header from "@/components/habits/Header.vue";
import HabitList from "@/components/habits/HabitList.vue";
import HabitListSummary from "@/components/habits/HabitListSummary.vue";

@Options({
    components: {
        Header,
        HabitList,
        HabitListSummary,
    },
})
export default class HomeView extends Vue {}
</script>

<style lang="scss">
.container {
    padding: 20px;
    margin: 10px 20px;
    border-radius: 20px;
}

.main {
    width: 90vw;
}

.home {
    margin: 70px auto;
    height: 75vh;
    overflow: hidden;
    padding: 30px;
    border: 2px solid #d3bfbf;
    border-radius: 20px;
    width: 145vh;
}

.d-flex {
    display: flex;

    &.wrap {
        flex-wrap: wrap;
    }

    &.wrap-reverse {
        flex-wrap: wrap-reverse;
    }
}

.f-align-items {
    align-items: center;
}

.f-justify-end {
    justify-content: flex-end;
}

.f-justify-between {
    justify-content: space-between;
}

.p-20 {
    padding: 20px;
}

.pr-50 {
    padding-right: 50px;
}

.pl-50 {
    padding-left: 50px;
}

.pb-10 {
    padding-bottom: 10px;
}

.mt-20 {
    margin-top: 20px;
}

.mt-15 {
    margin-top: 15px;
}

.mt-30 {
    margin-top: 30px;
}

.mr-10 {
    margin-right: 10px;
}

.mr-15 {
    margin-right: 15px;
}

.icon {
    width: 12px;
    cursor: pointer;
}

.btn {
    padding: 10px 25px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn-primary {
    background: linear-gradient(60deg,
            rgba(238, 176, 139, 1) 6%,
            rgba(221, 111, 63, 1) 50%,
            rgba(220, 119, 113, 1) 80%);

    &:hover {
        background-color: #ceb5ad;
    }
}

.btn-secondary {
    background-color: #efefef;

    &:hover {
        background-color: #c7c7c7;
    }
}

.ellipsis {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 150px;
}

@media screen and (max-width: 480px) {
    .header {
        padding: 20px;
    }

    .content,
    .summary {
        width: 100%;
    }
}

@media screen and (min-width: 481px) and (max-width: 768px) {
    .header {
        padding: 20px;
    }

    .summary {
        width: 100%;
    }

    .flex-item {
        flex: 1;
    }
}

@media screen and (min-width: 769px) {
    .header {
        padding: 20px 0px 0px 65px;

    }

    .container {
        margin-right: 150px;
    }

    .flex-item {
        flex: 1 1;
    }
}

@media screen and (min-width: 1024px) {
    .header {
        width: 50vw;
    }
}
</style>
