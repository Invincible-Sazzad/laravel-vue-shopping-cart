<script setup>
import { RouterView } from 'vue-router';
import CustomNavbar from './components/CustomNavbar.vue';
</script>

<template>
  <div class="">
    <header>
      <CustomNavbar />
    </header>

    <RouterView />
  </div>
  
</template>

<style scoped>

</style>
