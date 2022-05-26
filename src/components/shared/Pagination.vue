<template>
<div class="pagination">
    <button v-if="showPrevious" class="item prev" @click="changePage(current - 1)">
        &lt;
    </button>
    <button v-for="(page, index) in pages" :key="page" class="item" :class="{ current: page === current + 1 }" @click="changePage(index)">
        {{ page }}
    </button>
    <button v-if="showNext" class="item next" @click="changePage(current + 1)">
        &gt;
    </button>
</div>
</template>

<script>
export default {
    name: "Pagination",
    props: {
        offset: {
            type: [String, Number],
            default: 0,
        },
        total: {
            type: [String, Number],
            required: true,
        },
        limit: {
            type: [String, Number],
            default: 10,
        },
    },
    computed: {
        showPrevious() {
            return this.current + 1 > 1;
        },
        showNext() {
            return this.total > this.limit * (this.current + 1);
        },
        current() {
            return (this.offset / this.limit) - 1;
        },
        pages() {
            const qty = Math.ceil(this.total / this.limit);
            if (qty <= 1) return [1];
            return Array.from(Array(qty).keys(), (i) => i + 1);
        },
    },
    methods: {
        changePage(offset) {
            this.$emit("change-page", offset);
        },
    },
};
</script>

<style lang="scss" scoped>
.pagination {
    display: flex;
    justify-content: center;

    .item {
        padding: 0.5rem 0.75rem;
        border: 1px solid #cccccc;
        cursor: pointer;
        background-color: white;

        &:first-child {
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
        }

        &:last-child {
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
        }

        &:hover {
            background-color: #cccccc;
            border-color: lighten(#333333, 50%);
            z-index: 3;
        }

        &.current {
            cursor: default;
            color: white;
            background: linear-gradient(60deg,
                    rgba(238, 176, 139, 1) 6%,
                    rgba(221, 111, 63, 1) 50%,
                    rgba(220, 119, 113, 1) 80%);
            z-index: 2;
        }

        +.item {
            margin-left: -1px;
            margin-right: 0;
        }
    }
}
</style>
