<template>
    <div>
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        @change="handleFileChange"
        accept="image/*"
        multiple
      />
  
      <div
        v-if="uploadedImages.length === 0"
        class="m-6 p-6 border border-dashed border-gray-300 rounded-2xl max-w-3xl mx-auto text-center"
      >
        <div class="flex justify-center mb-6">
          <img
            alt="Image icon"
            src="https://cdn-icons-png.flaticon.com/512/1829/1829586.png"
            class="w-24 h-24"
          />
        </div>
  
        <h1 class="text-2xl font-semibold mb-6">Drag and drop to upload or</h1>
  
        <button
          @click="triggerFileInput"
          class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full mb-6"
        >
          Browse
        </button>
  
        <p class="text-gray-500 mb-10">
          (You have
          <span class="text-green-500 font-medium">50 uploads</span> left today)
        </p>
  
        <div
          class="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4 text-left text-sm text-gray-700 max-w-2xl mx-auto"
        >
          <div class="flex items-start" v-for="(tip, index) in tips" :key="index">
            <i class="fas fa-check-circle text-green-500 mr-2 mt-0.5"></i>
            <span v-html="tip"></span>
          </div>
        </div>
      </div>
  
      <!-- When images are uploaded -->
      <div v-else class="bg-white min-h-screen flex justify-center">
        <div class="flex p-4">
          <!-- Left Sidebar -->
          <div class="flex flex-col items-center space-y-4 m-6">
            <div
              class="w-20 h-20 bg-gray-100 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-200"
              @click="triggerFileInput"
            >
              <i class="fas fa-plus text-gray-500"></i>
            </div>
  
            <div
              v-for="(img, index) in uploadedImages"
              :key="index"
              class="w-20 h-20 border-2 border-pink-500 rounded-lg overflow-hidden"
            >
              <img :src="img.url" class="w-full h-full object-cover" />
            </div>
          </div>
  
          <!-- Main Content -->
          <div class="w-full max-w-4xl m-6">
            <!-- Display error images -->
            <div
              v-for="(img, index) in uploadedImages.filter((i) => !i.status)"
              :key="'error-' + index"
              class="bg-pink-100 p-10 rounded-lg flex items-center space-x-4 mb-4"
            >
              <img :src="img.url" class="w-[35%] object-cover rounded-lg" />
              <div class="flex-1">
                <p class="text-pink-600">{{ img.tip }}</p>
                <button
                  class="mt-2 bg-pink-500 text-white px-4 py-2 rounded-lg"
                  @click="retryUpload"
                >
                  Re-select image
                </button>
              </div>
              <button class="text-pink-500 p-10" @click="removeImage(img)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
  
            <!-- Display valid images -->
            <div
              v-for="(img, index) in uploadedImages.filter((i) => i.status)"
              :key="'ok-' + index"
              class="bg-gray-100 p-10 mt-4 rounded-lg flex space-x-4"
            >
              <img :src="img.url" class="w-[35%] object-cover rounded-lg" />
              <div class="flex-1 space-y-4">
                <div>
                  <label class="block text-gray-600">Title (optional)</label>
                  <input
                    class="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter title"
                    type="text"
                    v-model="img.title"
                  />
                </div>
                <div>
                  <label class="block text-gray-600">Tags (optional)</label>
                  <TagInput v-model="img.tags" />
                </div>
                <div>
                  <label class="block text-gray-600">Location (optional)</label>
                  <input
                    class="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter location"
                    type="text"
                    v-model="img.location"
                  />
                </div>
              </div>
              <button class="text-gray-500 p-10" @click="removeImage(img)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
  
        <!-- Footer -->
        <div
          class="fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-between items-center"
        >
          <div class="flex items-center space-x-1">
            <div class="w-4 h-4 bg-green-500 rounded-full"></div>
            <p class="text-green-500">Uploaded content</p>
            <p class="text-gray-500">
              Uploaded {{ uploadedImages.filter((i) => i.status).length }}/{{ totalImages }}
              images and videos
            </p>
          </div>
          <div class="flex items-center space-x-1">
            <div class="w-4 h-4 bg-red-500 rounded-full"></div>
            <p class="text-red-500">Failed uploads</p>
            <p class="text-gray-500">
              Failed to upload {{ failedUploads }}/{{ totalImages }} images and videos
            </p>
          </div>
          <button  @click="sendToServer" class="bg-green-500 text-white px-4 py-2 rounded-lg">
            Submit your content
          </button>
        </div>
      </div>
    </div>
    <!-- Loading overlay -->
<div
  v-if="isUploading"
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
>
  <div class="flex flex-col items-center">
    <svg
      class="animate-spin h-10 w-10 text-white mb-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
    <p class="text-white text-lg font-semibold">Đang tải lên...</p>
  </div>
</div>

  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { storeToRefs } from 'pinia';
  import { useUserStore } from '@/stores/userStore';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);
  const uploadedImages = ref([]);
  const failedUploads = ref(0);
  const totalImages = ref(0);
  const fileInput = ref(null);
  const isUploading = ref(false);

  import TagInput  from '../components/ui/tag-input.vue';
  
  const tips = [
    "Original <strong>content</strong> you captured",
    "Respect other people's rights",
    "<strong>High quality</strong> photos and videos",
    "No nudity, violent or hateful content",
    "Free to download and use",
    "Read Pexels Terms of Use",
  ];
  
  onMounted(() => {
    userStore.loadFromLocalStorage();
    console.log('User data on mounted:', user.value[0].account.username); 
  });
  
  const triggerFileInput = () => {
    fileInput.value.click();
  };
  
  import axios from "axios";
  
  const sendToServer = async () => {
    const validImages = uploadedImages.value.filter(img => img.status);
    isUploading.value = true;
    for (const img of validImages) {
      const formData = new FormData();
      formData.append('file', img.file);
      formData.append('title', img.title || "");
      formData.append('location', img.location || "");
      formData.append('username', user.value[0].account?.username);
  
      if (img.tags && img.tags.length > 0) {
        img.tags.forEach(tag => {
          formData.append('tags', JSON.stringify(img.tags));
        });
      }
  
      try {
        const res = await axios.post('http://localhost:8080/api/images/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Response:', res.data);
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  
    uploadedImages.value = [];
    failedUploads.value = 0;
    totalImages.value = 0;
    setTimeout(() => {
    isUploading.value = false;
    router.push({ path: '/home', query: { uploaded: 'true' } });
  }, 2000);
  };
  
  const handleFileChange = (event) => {
    const files = event.target.files;
  
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const megapixel = (img.width * img.height) / 1000000;
          const url = e.target.result;
  
          if (megapixel < 4) {
            uploadedImages.value.push({
              url,
              status: false,
              tip: "Image must be at least 4 megapixels. This image will not be published.",
            });
            failedUploads.value++;
          } else {
            uploadedImages.value.push({
              url,
              status: true,
              tip: "Upload successful",
              title: "",
              tags: [],
              location: "",
              file
            });
          }
  
          totalImages.value++;
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  
    event.target.value = "";
  };
  
  const retryUpload = () => {
    fileInput.value.click();
  };
  
  const removeImage = (img) => {
    const index = uploadedImages.value.indexOf(img);
    if (index !== -1) {
      const removed = uploadedImages.value.splice(index, 1)[0];
      if (!removed.status) {
        failedUploads.value--;
      }
      totalImages.value--;
    }
  };
  </script>
  
  <style scoped>
  input[type="file"] {
    display: none;
  }
  </style>
  