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
     <!-- Categories Section (Tag Style) -->
      <section class="container mx-auto px-4 py-12">
        <h2 class="text-2xl font-bold mb-6">Browse Categories</h2>
        <div class="flex flex-wrap gap-3">
          <button
            v-for="category in categories"
            :key="category.name"
            @click="handleCategoryClick(category.name)"
            class="px-4 py-2 rounded-full border border-gray-300 text-gray-800 hover:bg-gray-100 transition"
          >
            {{ category.name }}
          </button>
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
  import axios from 'axios'
  export default {
    components: {
      SearchBar,
      ImageCard,
    },
    data() {
      return {
        likedImages: [],
        featuredImages: [],
        categories: [],


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
      async fetchFeaturedImages(page = 0) {
      try {
        const response = await axios.get(`http://localhost:8080/api/images/featured?page=${page}`)
        this.featuredImages = response.data
      } catch (error) {
        console.error('Failed to fetch featured images:', error)
      }
    },
    async fetchCategoryFeaturedImages() {
      try {
        const response = await axios.get(`http://localhost:8080/api/images/top-tags`)
        this.categories = response.data
      } catch (error) {
        console.error('Failed to fetch Category featured images:', error)
      }
    },
      
    },
    mounted() {
    this.fetchFeaturedImages()
    this.fetchCategoryFeaturedImages()
  },
  }
  </script>
  
  <style scoped>
 
  </style>
  


  