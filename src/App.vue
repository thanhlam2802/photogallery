<script setup>
import Footer from './components/layout/Footer.vue';
import Header from './components/layout/Header.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white">
    <Header />
    <main class="flex-grow">
   
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
