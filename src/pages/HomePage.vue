<template>
  <div class="w-full">
    <!-- Hero Section -->
    <section
      class="relative h-[70vh] min-h-[500px] bg-cover bg-center flex items-center justify-center"
      :style="{
        backgroundImage:
          'url(\'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80\')',
      }"
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
      <!-- Featured Images Header -->
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6"
      >
        <h2 class="text-2xl font-bold mb-4 sm:mb-0">Featured Photos</h2>
        <div class="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
          <button
            @click="viewMode = 'grid'"
            :class="[
              'hover:text-blue-600 transition',
              viewMode === 'grid' ? 'text-blue-600' : 'text-gray-500',
            ]"
            title="Hiển thị dạng lưới"
          >
            <GridIcon class="w-6 h-6" />
          </button>
          <button
            @click="viewMode = 'list'"
            :class="[
              'hover:text-blue-600 transition',
              viewMode === 'list' ? 'text-blue-600' : 'text-gray-500',
            ]"
            title="Hiển thị dạng danh sách"
          >
            <ListIcon class="w-6 h-6" />
          </button>
        </div>
      </div>

      <div
        v-if="viewMode === 'grid'"
        class="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4"
      >
        <ImageCard
          v-for="image in featuredImages"
          :key="image.id"
          :id="image.id"
          :imageUrl="image.imageUrl"
          :photographer="image.photographer"
          :width="image.width"
          :height="image.height"
          :liked="likedImages.includes(image.id)"
          @like="handleLike(image.id)"
        />
      </div>

      <div v-else class="flex flex-col gap-4">
        <ImageCard
          v-for="image in featuredImages"
          :key="image.id"
          class="flex-row items-center shadow-sm hover:shadow-md transition max-w-4xl mx-auto"
          :id="image.id"
          :imageUrl="image.imageUrl"
          :photographer="image.photographer"
          :width="image.width"
          :height="image.height"
          :liked="likedImages.includes(image.id)"
          @like="handleLike(image.id)"
        />
      </div>
    </section>
    <div v-if="isLoadingMore" class="w-full flex justify-center py-10">
  <div class="loader">
    <span></span>
    <span></span>
    <span></span>
  </div>
  </div>
    <!-- CTA Section -->
    <section class="bg-blue-50 py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">
          Share Your Photography With The World
        </h2>
        <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Join our community of photographers and showcase your best work to
          millions of people.
        </p>
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors"
        >
          Join Pixelshare
        </button>
      </div>
    </section>
  </div>
  <div
    v-if="showSuccessMessage"
    class="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg transition-opacity duration-500 z-50"
  >
    Upload thành công!
  </div>
 

</template>

<script>
import { useRoute } from "vue-router";
import SearchBar from "../components/ui/SearchBar.vue";
import ImageCard from "../components/ui/ImageCard.vue";
import axios from "axios";
import { Grid as GridIcon, List as ListIcon } from "lucide-vue-next";

export default {
  components: {
    SearchBar,
    ImageCard,
    GridIcon,
    ListIcon,
  },
  data() {
    return {
      likedImages: [],
      featuredImages: [],
      categories: [],
      showSuccessMessage: false,
      viewMode: "grid",
      isLoadingMore: false,
    };
  },
  methods: {
    handleSearch(query) {
      this.$router.push(`/category?q=${encodeURIComponent(query)}`);
    },
    handleLike(id) {
      if (this.likedImages.includes(id)) {
        this.likedImages = this.likedImages.filter((imgId) => imgId !== id);
      } else {
        this.likedImages.push(id);
      }
    },
    async handleScroll() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 100 && !this.isLoadingMore) {
      this.isLoadingMore = true;
      await this.fetchFeaturedImages(++this.page);
      this.isLoadingMore = false;
    }
  },

    async fetchFeaturedImages(page = 0) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/images/featured?page=${page}`
        );
        if (page === 0) {
      this.featuredImages = response.data; 
    } else {
      this.featuredImages.push(...response.data); 
    }
      } catch (error) {
        console.error("Failed to fetch featured images:", error);
      }
    },
    async fetchCategoryFeaturedImages() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/images/top-tags`
        );
        this.categories = response.data;
      } catch (error) {
        console.error("Failed to fetch Category featured images:", error);
      }
    },
  },
  mounted() {
    this.fetchFeaturedImages();
    this.fetchCategoryFeaturedImages();
    const route = useRoute();
    if (route.query.uploaded === "true") {
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);

    }
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
  window.removeEventListener("scroll", this.handleScroll);
},
};
</script>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  height: 60px;
}

.loader span {
  width: 10px;
  height: 10px;
  background: #3b82f6; /* màu xanh dương */
  border-radius: 50%;
  animation: bounce 0.6s infinite ease-in-out;
}

.loader span:nth-child(2) {
  animation-delay: 0.2s;
}

.loader span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

</style>
