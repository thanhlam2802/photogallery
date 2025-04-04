<template>
    <header class="sticky top-0 z-50 bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        
        <RouterLink to="/" class="flex items-center">
          <span class="text-2xl font-bold text-gray-800">Pixelshare</span>
        </RouterLink>
  
        
        <nav class="hidden md:flex items-center space-x-6">
          <RouterLink to="/" class="text-gray-600 hover:text-gray-900">Home</RouterLink>
          <RouterLink to="/category" class="text-gray-600 hover:text-gray-900">Explore</RouterLink>
          <RouterLink
            :to="{ path: '/category', query: { collection: 'popular' } }"
            class="text-gray-600 hover:text-gray-900"
          >
            Popular
          </RouterLink>
  
          <template v-if="isLoggedIn">
            <RouterLink
              to="/upload"
              class="flex items-center text-gray-600 hover:text-gray-900"
            >
              <UploadIcon class="w-5 h-5 mr-1" />
              <span>Upload</span>
            </RouterLink>
            <RouterLink
              to="/profile/user123"
              class="flex items-center text-gray-600 hover:text-gray-900"
            >
              <UserIcon class="w-5 h-5 mr-1" />
              <span>Profile</span>
            </RouterLink>
          </template>
          <template v-else>
            <RouterLink
              to="/auth"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Sign In
            </RouterLink>
          </template>
        </nav>
  
        <button
          class="md:hidden text-gray-500 hover:text-gray-700"
          @click="isMenuOpen = !isMenuOpen"
        >
          <component :is="isMenuOpen ? XIcon : MenuIcon" class="w-6 h-6" />
        </button>
      </div>
  
    
      <div v-if="isMenuOpen" class="md:hidden bg-white border-t border-gray-100">
        <div class="container mx-auto px-4 py-3 flex flex-col space-y-3">
          <RouterLink to="/" class="py-2 text-gray-600 hover:text-gray-900">Home</RouterLink>
          <RouterLink to="/category" class="py-2 text-gray-600 hover:text-gray-900">Explore</RouterLink>
          <RouterLink
            :to="{ path: '/category', query: { collection: 'popular' } }"
            class="py-2 text-gray-600 hover:text-gray-900"
          >
            Popular
          </RouterLink>
  
          <template v-if="isLoggedIn">
            <RouterLink
              to="/upload"
              class="py-2 flex items-center text-gray-600 hover:text-gray-900"
            >
              <UploadIcon class="w-5 h-5 mr-1" />
              <span>Upload</span>
            </RouterLink>
            <RouterLink
              to="/profile/user123"
              class="py-2 flex items-center text-gray-600 hover:text-gray-900"
            >
              <UserIcon class="w-5 h-5 mr-1" />
              <span>Profile</span>
            </RouterLink>
          </template>
          <template v-else>
            <RouterLink
              to="/auth"
              class="py-2 bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-lg transition-colors inline-block"
            >
              Sign In
            </RouterLink>
          </template>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router'
  import { MenuIcon, XIcon, UserIcon, UploadIcon } from 'lucide-vue-next'
  
  const isMenuOpen = ref(false)
  const isLoggedIn = ref(false) 
  </script>
  