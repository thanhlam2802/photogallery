<script setup>
import Footer from './components/layout/Footer.vue';
import Header from './components/layout/Header.vue';
import { RouterView } from 'vue-router';
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
userStore.loadFromLocalStorage()
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white">
    <Header />
    <main class="flex-grow">
   
      <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    </main>
    <Footer />
  </div>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>