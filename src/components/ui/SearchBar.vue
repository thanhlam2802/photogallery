<template>
    <form @submit.prevent="handleSubmit" :class="['relative w-full', large ? 'max-w-4xl' : 'max-w-md']">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="large ? 'Search for free high-resolution photos' : 'Search photos'"
          class="w-full bg-gray-50 border border-gray-200 rounded-lg pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          :class="large ? 'py-4 text-lg' : 'py-2 text-base'"
        />
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <!-- Font Awesome Search Icon -->
          <i :class="large ? 'fas fa-search text-gray-400 w-6 h-6' : 'fas fa-search text-gray-400 w-5 h-5'"></i>
        </div>
      </div>
    </form>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'SearchBar',
    props: {
      large: {
        type: Boolean,
        default: false
      },
      onSearch: {
        type: Function,
        default: null
      }
    },
    setup(props) {
      const searchQuery = ref('');
  
      const handleSubmit = () => {
        if (props.onSearch && searchQuery.value.trim()) {
          props.onSearch(searchQuery.value.trim());
        }
      };
  
      return {
        searchQuery,
        handleSubmit
      };
    }
  });
  </script>
  
  <style scoped>
  /* Add any additional styling here if needed */
  </style>
  