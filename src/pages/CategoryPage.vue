<template>
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-4">
          {{ query ? `Search results for "${query}"` : 'Explore Photos' }}
        </h1>
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="w-full md:w-1/2">
            <SearchBar :onSearch="handleSearch" />
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="showFilters = !showFilters"
              class="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
            <i class="fa fa-sliders-h"></i>

              <span>Filters</span>
              <span v-if="activeFilters.length > 0" class="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                {{ activeFilters.length }}
              </span>
            </button>
            <div class="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                @click="viewMode = 'grid'"
                :class="['p-2', viewMode === 'grid' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50']"
              >
              <i class="fa fa-th"></i>

              </button>
              <button
                @click="viewMode = 'masonry'"
                :class="['p-2', viewMode === 'masonry' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50']"
              >
              <i class="fa fa-th-large"></i>

              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Filters -->
      <div v-if="showFilters" class="bg-gray-50 p-4 rounded-lg mb-8">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-semibold">Filters</h3>
          <button @click="showFilters = false" class="text-gray-500 hover:text-gray-700">
            <!-- <XIcon class="w-5 h-5" /> -->
          </button>
        </div>
  
        <!-- Color Filters -->
        <div class="mb-6">
          <h4 class="text-sm font-medium mb-2">Colors</h4>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="colorFilter in colorFilters"
              :key="colorFilter.name"
              @click="toggleFilter(colorFilter.name.toLowerCase())"
              :class="['flex items-center px-3 py-1.5 rounded-full text-sm', activeFilters.includes(colorFilter.name.toLowerCase()) ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-white border-gray-300 hover:bg-gray-50', 'border']"
            >
              <span
                class="w-3 h-3 rounded-full mr-1.5"
                :style="{ backgroundColor: colorFilter.color }"
              ></span>
              {{ colorFilter.name }}
            </button>
          </div>
        </div>
  
        <!-- Orientation Filters -->
        <div class="mb-6">
          <h4 class="text-sm font-medium mb-2">Orientation</h4>
          <div class="flex gap-2">
            <button
              @click="toggleOrientation('landscape')"
              :class="['px-3 py-1.5 rounded-full text-sm', activeFilters.includes('landscape') ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-white border-gray-300 hover:bg-gray-50', 'border']"
            >
              Landscape
            </button>
            <button
              @click="toggleOrientation('portrait')"
              :class="['px-3 py-1.5 rounded-full text-sm', activeFilters.includes('portrait') ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-white border-gray-300 hover:bg-gray-50', 'border']"
            >
              Portrait
            </button>
            <button
              @click="toggleFilter('square')"
              :class="['px-3 py-1.5 rounded-full text-sm', activeFilters.includes('square') ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-white border-gray-300 hover:bg-gray-50', 'border']"
            >
              Square
            </button>
          </div>
        </div>
  
        <!-- Size Filters -->
        <div>
          <h4 class="text-sm font-medium mb-2">Size</h4>
          <div class="flex gap-2">
            <button
              @click="toggleFilter('large')"
              :class="['px-3 py-1.5 rounded-full text-sm', activeFilters.includes('large') ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-white border-gray-300 hover:bg-gray-50', 'border']"
            >
              Large
            </button>
            <button
              @click="toggleFilter('medium')"
              :class="['px-3 py-1.5 rounded-full text-sm', activeFilters.includes('medium') ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-white border-gray-300 hover:bg-gray-50', 'border']"
            >
              Medium
            </button>
            <button
              @click="toggleFilter('small')"
              :class="['px-3 py-1.5 rounded-full text-sm', activeFilters.includes('small') ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-white border-gray-300 hover:bg-gray-50', 'border']"
            >
              Small
            </button>
          </div>
        </div>
  
        <!-- Clear Filters -->
        <div v-if="activeFilters.length > 0" class="mt-6 pt-4 border-t border-gray-200 flex justify-between">
          <span class="text-sm text-gray-500">
            {{ activeFilters.length }} {{ activeFilters.length === 1 ? 'filter' : 'filters' }} applied
          </span>
          <button @click="clearFilters" class="text-sm text-blue-600 hover:text-blue-800">
            Clear all
          </button>
        </div>
      </div>
  
      <!-- Image Grid -->
      <div :class="viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4'">
        <div
          v-for="image in categoryImages"
          :key="image.id"
          :class="viewMode === 'masonry' ? 'mb-4 break-inside-avoid' : ''"
        >
          <ImageCard
            :id="image.id"
            :imageUrl="image.imageUrl"
            :photographer="image.photographer"
            :liked="likedImages.includes(image.id)"
            @like="handleLike(image.id)"
          />
        </div>
      </div>
  
      <!-- Pagination -->
      <div class="mt-12 flex justify-center">
        <div class="flex space-x-1">
          <button class="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-500">
            Previous
          </button>
          <button class="px-4 py-2 border border-blue-500 rounded-lg bg-blue-500 text-white">
            1
          </button>
          <button class="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
            2
          </button>
          <button class="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
            3
          </button>
          <button class="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
            ...
          </button>
          <button class="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
            10
          </button>
          <button class="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-700">
            Next
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import SearchBar from '../components/ui/SearchBar.vue'
  import ImageCard from '../components/ui/ImageCard.vue'
 
  
  export default {
    components: {
      
     
    },
    setup() {
      const query = ref(new URLSearchParams(window.location.search).get('q') || '')
      const likedImages = ref([])
      const activeFilters = ref([])
      const showFilters = ref(false)
      const viewMode = ref('grid')
  
      const categoryImages = [
      {
    id: 'c1',
    imageUrl: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c',
    photographer: {
      name: 'Minh Tran',
      username: 'minhtran',
    },
  },
  {
    id: 'c2',
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    photographer: {
      name: 'Linh Nguyen',
      username: 'linhnguyen',
    },
  },
  {
    id: 'c3',
    imageUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff',
    photographer: {
      name: 'Tuan Pham',
      username: 'tuanpham',
    },
  },
  {
    id: 'c4',
    imageUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
    photographer: {
      name: 'Hai Le',
      username: 'haile',
    },
  },
  {
    id: 'c5',
    imageUrl: 'https://images.unsplash.com/photo-1500534623283-312aade485b7',
    photographer: {
      name: 'Quang Nguyen',
      username: 'quangnguyen',
    },
  },
  {
    id: 'c6',
    imageUrl: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1',
    photographer: {
      name: 'Hoa Tran',
      username: 'hoatran',
    },
    height: 1.5, // Taller image
  },
  {
    id: 'c7',
    imageUrl: 'https://images.unsplash.com/photo-1444464666168-49d633b86797',
    photographer: {
      name: 'Nam Hoang',
      username: 'namhoang',
    },
    width: 2, // Wider image
  },
  {
    id: 'c8',
    imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    photographer: {
      name: 'Trung Vo',
      username: 'trungvo',
    },
  },
  {
    id: 'c9',
    imageUrl: 'https://images.unsplash.com/photo-1552083375-1447ce886485',
    photographer: {
      name: 'Mai Phan',
      username: 'maiphan',
    },
  },
  {
    id: 'c10',
    imageUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f',
    photographer: {
      name: 'Duc Nguyen',
      username: 'ducnguyen',
    },
  },
       
      ]
  
      const colorFilters = [
        { name: 'Black & White', color: '#000000' },
        { name: 'Red', color: '#FF0000' },
        // Các màu khác...
      ]
  
      const handleSearch = (newQuery) => {
        query.value = newQuery
        window.history.pushState({}, '', `?q=${newQuery}`)
      }
  
      const handleLike = (id) => {
        if (likedImages.value.includes(id)) {
          likedImages.value = likedImages.value.filter((imgId) => imgId !== id)
        } else {
          likedImages.value.push(id)
        }
      }
  
      const toggleFilter = (filter) => {
        if (activeFilters.value.includes(filter)) {
          activeFilters.value = activeFilters.value.filter((f) => f !== filter)
        } else {
          activeFilters.value.push(filter)
        }
      }
  
      const toggleOrientation = (orientation) => {
        if (activeFilters.value.includes('portrait') && orientation === 'landscape') {
          activeFilters.value = activeFilters.value.filter((f) => f !== 'portrait').concat('landscape')
        } else if (activeFilters.value.includes('landscape') && orientation === 'portrait') {
          activeFilters.value = activeFilters.value.filter((f) => f !== 'landscape').concat('portrait')
        } else if (activeFilters.value.includes(orientation)) {
          activeFilters.value = activeFilters.value.filter((f) => f !== orientation)
        } else {
          activeFilters.value.push(orientation)
        }
      }
  
      const clearFilters = () => {
        activeFilters.value = []
      }
  
      return {
        query,
        likedImages,
        activeFilters,
        showFilters,
        viewMode,
        categoryImages,
        colorFilters,
        handleSearch,
        handleLike,
        toggleFilter,
        toggleOrientation,
        clearFilters
      }
    }
  }
  </script>
  
  <style scoped>
  /* Các style tùy chỉnh */
  </style>
  