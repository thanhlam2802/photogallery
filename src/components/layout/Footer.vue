<template>
    <footer class="bg-gray-50 border-t border-gray-100">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Thông tin chính -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Pixelshare</h3>
            <p class="text-gray-600 text-sm">
              Beautiful, free photos shared by talented creators.
            </p>
            <div class="flex space-x-4 mt-4">
              <a href="#" class="text-gray-400 hover:text-gray-600">
                <InstagramIcon class="w-5 h-5" />
              </a>
              <a href="#" class="text-gray-400 hover:text-gray-600">
                <TwitterIcon class="w-5 h-5" />
              </a>
              <a href="#" class="text-gray-400 hover:text-gray-600">
                <FacebookIcon class="w-5 h-5" />
              </a>
              <a href="#" class="text-gray-400 hover:text-gray-600">
                <GithubIcon class="w-5 h-5" />
              </a>
            </div>
          </div>
  
          <!-- Company -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Company</h3>
            <ul class="space-y-2 text-sm">
              <li><p class="text-gray-600 hover:text-gray-900 cursor-pointer">About</p></li>
              <li><p class="text-gray-600 hover:text-gray-900 cursor-pointer">Careers</p></li>
              <li><p class="text-gray-600 hover:text-gray-900 cursor-pointer">Blog</p></li>
            </ul>
          </div>
  
          <!-- Product -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Product</h3>
            <ul class="space-y-2 text-sm">
              <li><p class="text-gray-600 hover:text-gray-900 cursor-pointer">Explore</p></li>
              <li><p class="text-gray-600 hover:text-gray-900 cursor-pointer">Collections</p></li>
              <li><p class="text-gray-600 hover:text-gray-900 cursor-pointer">Premium</p></li>
            </ul>
          </div>
  
          <!-- Legal -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Legal</h3>
            <ul class="space-y-2 text-sm">
              <li><p class="text-gray-600 hover:text-gray-900 cursor-pointer">Terms of Service</p></li>
              <li><p class="text-gray-600 hover:text-gray-900 cursor-pointer">Privacy Policy</p></li>
              <li><p class="text-gray-600 hover:text-gray-900 cursor-pointer">License</p></li>
            </ul>
          </div>
        </div>
  
        <div class="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {{ new Date().getFullYear() }} Pixelshare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { GithubIcon, InstagramIcon, TwitterIcon, FacebookIcon } from 'lucide-vue-next'
  </script>
  