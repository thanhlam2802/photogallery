<template>
    <div>
      <!-- Cover Image -->
      <div class="h-60 sm:h-80 w-full relative">
        <img :src="profile.coverUrl" alt="Cover" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
      </div>
  
      <!-- Profile Info -->
      <div class="container mx-auto px-4">
        <div class="relative -mt-16 sm:-mt-24 mb-8 flex flex-col sm:flex-row sm:items-end">
          <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white overflow-hidden z-10">
            <img v-if="profile.avatarUrl" :src="profile.avatarUrl" :alt="profile.name" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full bg-blue-500 flex items-center justify-center">
              <i class="fas fa-user w-12 h-12 text-white"></i>
            </div>
          </div>
          <div class="mt-4 sm:mt-0 sm:ml-4 sm:mb-2 flex-grow">
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">{{ profile.name }}</h1>
            <p class="text-gray-500">@{{ profile.username }}</p>
          </div>
          <div class="mt-4 sm:mt-0">
            <button v-if="profile.isCurrentUser" class="flex items-center px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 rounded-lg text-gray-700 transition-colors">
              <i class="fas fa-cogs w-4 h-4 mr-2"></i>
              Edit Profile
            </button>
            <button v-else class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
              Follow
            </button>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div class="lg:col-span-3">
            <p class="text-gray-700 mb-4">{{ profile.bio }}</p>
            <div class="flex flex-wrap gap-y-2 text-gray-600 text-sm mb-6">
              <div v-if="profile.location" class="flex items-center mr-6">
                <i class="fas fa-map-marker-alt w-4 h-4 mr-1"></i>
                <span>{{ profile.location }}</span>
              </div>
              <div v-if="profile.website" class="flex items-center mr-6">
                <i class="fas fa-link w-4 h-4 mr-1"></i>
                <a :href="'https://' + profile.website" class="text-blue-600 hover:underline">{{ profile.website }}</a>
              </div>
              <div v-if="profile.joinDate" class="flex items-center">
                <i class="fas fa-calendar-alt w-4 h-4 mr-1"></i>
                <span>Joined {{ profile.joinDate }}</span>
              </div>
            </div>
          </div>
          <div class="lg:col-span-1">
            <div class="flex justify-between text-center">
              <div>
                <div class="text-2xl font-bold">{{ profile.photos.length }}</div>
                <div class="text-gray-500">Photos</div>
              </div>
              <div>
                <div class="text-2xl font-bold">{{ profile.followers.toLocaleString() }}</div>
                <div class="text-gray-500">Followers</div>
              </div>
              <div>
                <div class="text-2xl font-bold">{{ profile.following.toLocaleString() }}</div>
                <div class="text-gray-500">Following</div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Tabs -->
        <div class="border-b border-gray-200 mb-8">
          <div class="flex overflow-x-auto">
            <button
              :class="['py-4 px-6 border-b-2 font-medium text-sm flex items-center whitespace-nowrap', activeTab === 'photos' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']"
              @click="setActiveTab('photos')"
            >
              <i class="fas fa-th w-5 h-5 mr-2"></i>
              Photos
            </button>
            <button
              :class="['py-4 px-6 border-b-2 font-medium text-sm flex items-center whitespace-nowrap', activeTab === 'collections' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']"
              @click="setActiveTab('collections')"
            >
              <i class="fas fa-bookmark w-5 h-5 mr-2"></i>
              Collections
            </button>
            <button
              :class="['py-4 px-6 border-b-2 font-medium text-sm flex items-center whitespace-nowrap', activeTab === 'liked' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']"
              @click="setActiveTab('liked')"
            >
              <i class="fas fa-heart w-5 h-5 mr-2"></i>
              Liked Photos
            </button>
          </div>
        </div>
  
        <!-- Photos Grid -->
        <div v-if="activeTab === 'photos'" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          <ImageCard
            v-for="photo in profile.photos"
            :key="photo.id"
            :id="photo.id"
            :imageUrl="photo.imageUrl"
            :title="photo.title"
            :photographer="profile"
            :liked="likedImages.includes(photo.id)"
            @like="handleLike(photo.id)"
          />
        </div>
  
        <!-- Collections -->
        <div v-if="activeTab === 'collections'" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          <div
            v-for="collection in profile.collections"
            :key="collection.id"
            class="relative rounded-lg overflow-hidden shadow-sm group cursor-pointer"
          >
            <img
              :src="collection.coverUrl"
              :alt="collection.name"
              class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex flex-col justify-end p-4">
              <h3 class="text-lg font-semibold text-white">{{ collection.name }}</h3>
              <p class="text-white/80 text-sm">{{ collection.count }} photos</p>
            </div>
          </div>
        </div>
  
        <!-- Liked Photos -->
        <div v-if="activeTab === 'liked'" class="flex flex-col items-center justify-center py-12 text-center">
          <i class="fas fa-heart w-16 h-16 text-gray-300 mb-4"></i>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">No liked photos yet</h3>
          <p class="text-gray-500 max-w-md">
            When you like photos, they will appear here for you to easily find them again.
          </p>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  
  
  // Mock data for the profile page
  const PROFILE_DATA = {
    username: 'tuannguyen',
    name: 'Tuan Nguyen',
    avatarUrl:
      'https://images.unsplash.com/profile-1446404465118-3a53b909cc82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=27a346c4a37a98855387d02a6f1d19e2',
    coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    bio: "Photographer and nature lover based in Vietnam. Capturing the beauty of Southeast Asia's landscapes and cultures.",
    location: 'Ho Chi Minh City, Vietnam',
    website: 'tuannguyen.com',
    joinDate: 'January 2020',
    followers: 12500,
    following: 845,
    photos: [
      {
        id: 'p1',
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        title: 'Mountain Landscape at Sunset',
        likes: 3456,
      },
      // Add more photos...
    ],
    collections: [
      {
        id: 'c1',
        name: 'Mountains',
        count: 24,
        coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      },
      // Add more collections...
    ],
    isCurrentUser: true,
  };
  
  export default {
    components: {
     
    },
    setup() {
      const route = useRoute();
      const username = route.params.username;
  
      const profile = PROFILE_DATA; // In a real app, fetch the profile data based on the username
  
      const activeTab = ref('photos');
      const likedImages = ref([]);
  
      const handleLike = (id) => {
        if (likedImages.value.includes(id)) {
          likedImages.value = likedImages.value.filter((imgId) => imgId !== id);
        } else {
          likedImages.value.push(id);
        }
      };
  
      const setActiveTab = (tab) => {
        activeTab.value = tab;
      };
  
      return {
        profile,
        activeTab,
        likedImages,
        handleLike,
        setActiveTab,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  