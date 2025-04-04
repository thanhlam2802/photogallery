<template>
    <div class="container mx-auto px-4 py-8">
      <!-- Image Section -->
      <div class="bg-gray-50 rounded-lg overflow-hidden mb-8">
        <div class="relative">
          <img
            :src="image.imageUrl"
            :alt="image.title"
            class="w-full h-auto object-contain max-h-[80vh]"
          />
          <!-- Image Actions -->
          <div class="absolute bottom-4 right-4 flex space-x-2">
            <button
              @click="toggleLiked"
              :class="['p-2 rounded-full', liked ? 'bg-red-500 text-white' : 'bg-black/50 text-white hover:bg-black/60']"
            >
              <i class="fas fa-heart w-5 h-5" :style="liked ? 'fill: currentColor;' : ''"></i>
            </button>
            <button
              @click="toggleBookmarked"
              :class="['p-2 rounded-full', bookmarked ? 'bg-blue-500 text-white' : 'bg-black/50 text-white hover:bg-black/60']"
            >
              <i class="fas fa-bookmark w-5 h-5" :style="bookmarked ? 'fill: currentColor;' : ''"></i>
            </button>
            <button class="p-2 rounded-full bg-black/50 text-white hover:bg-black/60">
              <i class="fas fa-share-alt w-5 h-5"></i>
            </button>
            <div class="relative">
              <button
                @click="toggleDownloadOptions"
                class="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 flex items-center"
              >
                <i class="fas fa-download w-5 h-5 mr-1"></i>
                <span>Download</span>
              </button>
              <div v-if="showDownloadOptions" class="absolute bottom-full right-0 mb-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden">
                <div class="p-3 border-b border-gray-100">
                  <h4 class="font-medium">Download options</h4>
                </div>
                <div class="p-2">
                  <a
                    v-for="size in downloadSizes"
                    :key="size.name"
                    href="#"
                    class="flex justify-between items-center p-2 hover:bg-gray-50 rounded"
                    @click.prevent
                  >
                    <div>
                      <div class="font-medium">{{ size.name }}</div>
                      <div class="text-xs text-gray-500">
                        {{ size.width }} x {{ size.height }} • {{ size.size }}
                      </div>
                    </div>
                    <i class="fas fa-download w-4 h-4 text-gray-400"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Image Info -->
        <div class="lg:col-span-2">
          <h1 class="text-3xl font-bold mb-4">{{ image.title }}</h1>
          <p class="text-gray-600 mb-8">{{ image.description }}</p>
          <div class="flex flex-wrap gap-2 mb-6">
            <router-link
              v-for="tag in image.tags"
              :key="tag"
              :to="`/category?tag=${tag}`"
              class="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
            >
              {{ tag }}
            </router-link>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="flex items-center">
              <i class="fas fa-map-marker-alt w-5 h-5 text-gray-400 mr-2"></i>
              <span>{{ image.location }}</span>
            </div>
            <div class="flex items-center">
              <i class="fas fa-camera w-5 h-5 text-gray-400 mr-2"></i>
              <span>{{ image.camera }}</span>
            </div>
            <div class="flex items-center">
              <i class="fas fa-calendar-alt w-5 h-5 text-gray-400 mr-2"></i>
              <span>{{ image.uploadDate }}</span>
            </div>
            <div class="flex items-center">
              <i class="fas fa-info-circle w-5 h-5 text-gray-400 mr-2"></i>
              <span>{{ image.views.toLocaleString() }} views</span>
            </div>
          </div>
          <div class="mb-12">
            <h2 class="text-xl font-semibold mb-4">Similar Photos</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <router-link
                v-for="img in image.similarImages"
                :key="img.id"
                :to="`/photo/${img.id}`"
                class="block rounded-lg overflow-hidden"
              >
                <img
                  :src="img.imageUrl"
                  :alt="'Photo by ' + img.photographer.name"
                  class="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                />
              </router-link>
            </div>
          </div>
        </div>
  
        <!-- Right Column - Photographer Info -->
        <div>
          <div class="bg-gray-50 rounded-lg p-6">
            <div class="flex items-center mb-4">
              <img
                :src="image.photographer.avatarUrl"
                :alt="image.photographer.name"
                class="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 class="font-semibold text-lg">{{ image.photographer.name }}</h3>
                <p class="text-gray-500">@{{ image.photographer.username }}</p>
              </div>
            </div>
            <p class="text-gray-600 mb-4">{{ image.photographer.bio }}</p>
            <div class="flex justify-between mb-6 text-sm text-gray-500">
              <div>
                <div class="font-semibold text-gray-900">{{ image.photographer.photos }}</div>
                <div>Photos</div>
              </div>
              <div>
                <div class="font-semibold text-gray-900">{{ image.photographer.followers }}</div>
                <div>Followers</div>
              </div>
              <div>
                <div class="font-semibold text-gray-900">{{ (image.downloads / 1000).toFixed(1) }}K</div>
                <div>Downloads</div>
              </div>
            </div>
            <div class="flex space-x-3">
              <button class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
                Follow
              </button>
            </div>
          </div>
  
          <div class="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 class="font-semibold text-lg mb-4">License Information</h3>
            <p class="text-gray-600 mb-4">
              Free to use under the Pixelshare license
            </p>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                <span>Free for personal and commercial use</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                <span>No attribution required</span>
              </li>
              <li class="flex items-start">
                <span class="text-red-500 mr-2">✗</span>
                <span>Don't sell unmodified copies</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import { ref } from 'vue';
  
  export default {
    components: {
   
    },
    data() {
      return {
        liked: false,
        bookmarked: false,
        showDownloadOptions: false,
        image: {
          id: '1',
          title: 'Mountain Landscape at Sunset',
          description:
            'A beautiful mountain landscape captured during golden hour with dramatic clouds and vibrant colors.',
          imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
          uploadDate: 'October 15, 2023',
          location: 'Ha Giang, Vietnam',
          camera: 'Sony Alpha A7 III',
          tags: ['mountains', 'sunset', 'landscape', 'nature', 'vietnam'],
          downloads: 12453,
          views: 245789,
          photographer: {
            name: 'Tuan Nguyen',
            username: 'tuannguyen',
            avatarUrl:
              'https://images.unsplash.com/profile-1446404465118-3a53b909cc82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=27a346c4a37a98855387d02a6f1d19e2',
            bio: 'Nature and landscape photographer based in Vietnam. Capturing the beauty of Southeast Asia.',
          },
          similarImages: [
            {
              id: 's1',
              imageUrl: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c',
              photographer: {
                name: 'Minh Tran',
                username: 'minhtran',
              },
            },
            {
              id: 's2',
              imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
              photographer: {
                name: 'Linh Nguyen',
                username: 'linhnguyen',
              },
            },
            {
              id: 's3',
              imageUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff',
              photographer: {
                name: 'Tuan Pham',
                username: 'tuanpham',
              },
            },
            {
              id: 's4',
              imageUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
              photographer: {
                name: 'Hai Le',
                username: 'haile',
              },
            },
          ],
        },
        downloadSizes: [
          { name: 'Small', width: 640, height: 427, size: '0.2 MB' },
          { name: 'Medium', width: 1920, height: 1280, size: '0.8 MB' },
          { name: 'Large', width: 2400, height: 1600, size: '1.5 MB' },
          { name: 'Original', width: 5184, height: 3456, size: '5.2 MB' },
        ]
      }
    },
    methods: {
      toggleLiked() {
        this.liked = !this.liked;
      },
      toggleBookmarked() {
        this.bookmarked = !this.bookmarked;
      },
      toggleDownloadOptions() {
        this.showDownloadOptions = !this.showDownloadOptions;
      }
    }
  }
  </script>
  