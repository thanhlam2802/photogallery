<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { MenuIcon, XIcon, UserIcon, UploadIcon } from 'lucide-vue-next'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

const router = useRouter()
const isMenuOpen = ref(false)

const userStore = useUserStore()
userStore.loadFromLocalStorage()

const { isLoggedIn, user } = storeToRefs(userStore)

const logout = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userStore.token}`,
      }
    })

    if (response.ok) {
      userStore.logout()
      router.push('/auth')
    } else {
      const errorMessage = await response.text()
      console.error('Logout failed:', errorMessage)
      alert('Đăng xuất thất bại, vui lòng thử lại!')
    }
  } catch (error) {
    console.error('Logout error:', error)
    alert('Có lỗi xảy ra, vui lòng thử lại!')
  }
}
</script>

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
          <div class="relative group">
            <img
              :src="user[0].account.avatarUrl || 'https://via.placeholder.com/40'"
              alt="avatar"
              class="w-10 h-10 rounded-full cursor-pointer"
            />

            <div class="absolute top-12 right-0 mt-2 w-56 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ul class="py-2">
                <RouterLink :to="`/profile/${user?.id || 'user'}`">
                  <li class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <i class="fas fa-user text-gray-500 mr-3"></i>
                    <span>Hồ sơ của bạn</span>
                  </li>
                </RouterLink>
                <li class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <i class="fas fa-bookmark text-gray-500 mr-3"></i>
                  <span>Bộ sưu tập của bạn</span>
                </li>
                <li class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <i class="fas fa-cog text-gray-500 mr-3"></i>
                  <span>Cài đặt</span>
                </li>
                <li class="border-t my-2"></li>
                <li class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="logout">
                  <span>Đăng xuất</span>
                </li>
              </ul>
            </div>
          </div>
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
            :to="`/profile/${user?.id || 'user'}`"
            class="py-2 flex items-center text-gray-600 hover:text-gray-900"
          >
            <UserIcon class="w-5 h-5 mr-1" />
            <span>Profile</span>
          </RouterLink>
          <span
            @click="logout"
            class="py-2 text-red-500 hover:text-red-600 cursor-pointer"
          >
            Đăng xuất
          </span>
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
