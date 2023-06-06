<script lang="ts">
import { defineComponent } from 'vue';
import type { PageDto } from './model/pageDto';

const PAGE_SIZE = 10;

export default defineComponent({
    props: {
        totalItems: {
            type: Number,
            required: true,
        },
        page: {
            type: Number,
            required: true,
        },
        onPageClick: {
            type: Function,
            required: true,
        },
    },
    setup(props) {
        const handlePageClick = (page: number) => {
            props.onPageClick(page);
        };
        return {
            handlePageClick,
            totalPages: props.totalItems / PAGE_SIZE,
        };
    },
    computed: {
        currentPage: function (): number {
            return this.page;
        },
        pageItems: function (): Array<PageDto> {
            const { totalPages } = this;
            const pages: Array<PageDto> = [];
            for (let i = 1; i <= totalPages; i += 1) {
                pages.push({
                    current: i === this.page,
                    pageNumber: i,
                });
            }
            return pages;
        },
    }
});
</script>

<template>
    <ul class="flex gap-1 mt-3">
        <li>
            <button
                :disabled="currentPage === 1"
                :class="{'btn-page': true, 'cursor-not-allowed': currentPage === 1}"
                @click="$event => handlePageClick(currentPage - 1)">
                <font-awesome-icon icon="chevron-left" />
            </button>
        </li>
        <li v-for="item in pageItems" :key="item.pageNumber">
            <button
                :disabled="item.current"
                :class="{'btn-page': true, 'cursor-not-allowed': item.current}"
                @click="$event => handlePageClick(item.pageNumber)">{{ item.pageNumber }}</button>
        </li>
        <li>
            <button
                :disabled="currentPage === totalPages"
                :class="{'btn-page': true, 'cursor-not-allowed': currentPage === totalPages}"
                @click="$event => handlePageClick(currentPage + 1)">
                <font-awesome-icon icon="chevron-right" />
            </button>
        </li>
    </ul>
</template>

<style scoped>
.btn-page {
    @apply py-1 px-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700;
}
</style>