<template>
    <div class="w-full">
      <!-- Hero Section -->
      <section
        class="relative h-[70vh] min-h-[500px] bg-cover bg-center flex items-center justify-center"
        :style="{ backgroundImage: 'url(\'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80\')' }"
      >
        <div class="absolute inset-0 bg-black/40"></div>
        <div class="relative z-10 text-center px-4">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Beautiful Free Photos & Pictures
          </h1>
          <p class="text-xl text-white mb-8">
            Over a million free high-quality images shared by talented creators.
          </p>
          <div class="flex justify-center">
            <SearchBar large @search="handleSearch" />
          </div>
          <p class="mt-4 text-white/80 text-sm">
            Popular searches: nature, landscape, people, travel, food
          </p>
        </div>
      </section>
  
      <!-- Categories Section -->
      <section class="container mx-auto px-4 py-12">
        <h2 class="text-2xl font-bold mb-6">Browse Categories</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="category in categories"
            :key="category.name"
            class="relative h-40 rounded-lg overflow-hidden group cursor-pointer"
          >
            <img
              :src="category.imageUrl"
              :alt="category.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-black/30 flex items-center justify-center">
              <h3 class="text-xl font-semibold text-white">{{ category.name }}</h3>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Featured Images -->
      <section class="container mx-auto px-4 py-12">
        <h2 class="text-2xl font-bold mb-6">Featured Photos</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <ImageCard
            v-for="image in featuredImages"
            :key="image.id"
            :id="image.id"
            :imageUrl="image.imageUrl"
            :photographer="image.photographer"
            :liked="likedImages.includes(image.id)"
            @like="handleLike(image.id)"
          />
        </div>
      </section>
  
      <!-- CTA Section -->
      <section class="bg-blue-50 py-16">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold mb-4">
            Share Your Photography With The World
          </h2>
          <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of photographers and showcase your best work to millions of people.
          </p>
          <button class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors">
            Join Pixelshare
          </button>
        </div>
      </section>
    </div>
  </template>
  
  <script>
 import SearchBar from '../components/ui/SearchBar.vue';
  import ImageCard from '../components/ui/ImageCard.vue';
  
  export default {
    components: {
      SearchBar,
      ImageCard,
    },
    data() {
      return {
        likedImages: [],
        featuredImages: [
          { id: '1', imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', photographer: { name: 'Kevin Hoang', username: 'kevinhoang' } },
          { id: '2', imageUrl: 'https://images.unsplash.com/photo-1511300636408-a63a89df3482', photographer: { name: 'Minh Pham', username: 'minhpham' } },
          { id: '3', imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470', photographer: { name: 'Lan Nguyen', username: 'lannguyen' } },
          { id: '4', imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05', photographer: { name: 'Tuan Tran', username: 'tuantran' } },
          { id: '5', imageUrl: 'https://images.unsplash.com/photo-1497449493050-aad1e7cad165', photographer: { name: 'Linh Pham', username: 'linhpham' } },
          { id: '6', imageUrl: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e', photographer: { name: 'Huy Nguyen', username: 'huynguyen' } },
          { id: '7', imageUrl: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e', photographer: { name: 'Trung Le', username: 'trunglee' } },
          { id: '8', imageUrl: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e', photographer: { name: 'Quang Tran', username: 'quangtran' } },
        ],
        categories: [
          { name: 'Nature', imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e' },
          { name: 'Architecture', imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625' },
          { name: 'Travel', imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1' },
          { name: 'Food', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836' },
        ],
      }
    },
    methods: {
      handleSearch(query) {
        this.$router.push(`/category?q=${encodeURIComponent(query)}`)
      },
      handleLike(id) {
        if (this.likedImages.includes(id)) {
          this.likedImages = this.likedImages.filter((imgId) => imgId !== id)
        } else {
          this.likedImages.push(id)
        }
      },
    },
  }
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  


  