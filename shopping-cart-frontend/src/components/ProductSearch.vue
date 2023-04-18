<script setup>
import { ref } from 'vue';

let searchKey = ref('');

</script>

<template>
    <div class="w-[500px]">
        <form @submit.prevent="$emit('handleSearch', searchKey)">   
            <div class="relative">
                <input type="search" v-model="searchKey" class="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" placeholder="Search by keyword...">

                <button type="submit" class="absolute top-0 right-0 p-3 text-sm font-medium text-white bg-purple-700 rounded-r-lg border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                    <svg aria-hidden="true" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <span class="sr-only">Search</span>
                </button>
            </div>
        </form>
    </div>
</template>