<template>
    <div class="group relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <router-link :to="`/photo/${id}`">
        <img
          :src="imageUrl"
          :alt="title || `Photo by ${photographer.name}`"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </router-link>
      <!-- Gradients background on hover -->
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div class="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <!-- Photographer Info -->
        <router-link :to="`/profile/${photographer.username}`" class="flex items-center">
          <img
            v-if="photographer.avatarUrl"
            :src="photographer.avatarUrl"
            :alt="photographer.name"
            class="w-8 h-8 rounded-full mr-2"
          />
          <div
            v-else
            class="w-8 h-8 rounded-full bg-gray-300 mr-2 flex items-center justify-center"
          >
            {{ photographer.name.charAt(0) }}
          </div>
          <span class="text-white text-sm font-medium truncate">{{ photographer.name }}</span>
        </router-link>
        <!-- Actions: Like and Download -->
        <div class="flex space-x-2">
          <!-- Like Button -->
          <button
            @click="handleLike"
            class="p-1.5 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
            :class="{ 'text-red-500': liked, 'text-white': !liked }"
          >
            <i
              class="fa fa-heart"
              :class="liked ? 'text-red-500' : 'text-white'"
            ></i>
          </button>
          <!-- Download Button -->
          <router-link
            :to="`/photo/${id}?download=true`"
            class="p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            @click.stop
          >
            <i class="fa fa-download"></i>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  

  export default defineComponent({
    name: 'ImageCard',
    props: {
      id: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        default: '',
      },
      photographer: {
        type: Object,
        required: true,
        validator(value) {
          return (
            value.hasOwnProperty('name') &&
            value.hasOwnProperty('username') &&
            typeof value.name === 'string' &&
            typeof value.username === 'string'
          );
        },
      },
      liked: {
        type: Boolean,
        default: false,
      },
      onLike: {
        type: Function,
        default: null,
      },
    },
    methods: {
      handleLike(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.onLike) {
          this.onLike();
        }
      },
    },
  });
  </script>
  
  <style scoped>
  /* You can add custom styles for this component */
  </style>
  