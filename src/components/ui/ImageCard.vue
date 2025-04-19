<template>
  <div class="mb-4 break-inside-avoid">
    <div class="group relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <!-- Ảnh chính -->
      <router-link :to="`/photo/${id}`">
        <img
          :src="imageUrl"
          :alt="title || `Photo by ${photographer.name}`"
          class="w-full object-cover rounded"
          loading="lazy"
        />
      </router-link>

      <!-- Lớp mờ đen khi hover -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>

      <!-- Thông tin photographer + hành động -->
      <div
        class="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <!-- Photographer -->
        <router-link
          :to="`/profile/${photographer.username}`"
          class="flex items-center"
        >
          <img
            v-if="photographer.avatarUrl"
            :src="photographer.avatarUrl"
            :alt="photographer.name"
            class="w-8 h-8 rounded-full object-cover mr-2"
          />
          <div
            v-else
            class="w-8 h-8 rounded-full bg-gray-300 mr-2 flex items-center justify-center text-sm font-medium "
          >
            {{ photographer.name.charAt(0) }}
          </div>
          <span class="text-white text-sm font-medium truncate">
            {{ photographer.name }}
          </span>
        </router-link>

        <!-- Like & Download -->
        <div class="flex space-x-2">
          <button
            @click="handleLike"
            class="p-1.5 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
            :class="{ 'text-red-500': liked, 'text-white': !liked }"
          >
            <i class="fa fa-heart"></i>
          </button>
          <button
            @click.stop="downloadImage"
            class="p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
          >
            <i class="fa fa-download"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "ImageCard",
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
      default: "",
    },
    width: {
    type: Number,
    default: null,
  },
  height: {
    type: Number,
    default: null,
  },
    photographer: {
      type: Object,
      required: true,
      validator(value) {
        return (
          value.hasOwnProperty("name") &&
          value.hasOwnProperty("username") &&
          typeof value.name === "string" &&
          typeof value.username === "string"
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
    async downloadImage() {
      const confirmDownload = window.confirm(
        "Bạn có chắc muốn tải ảnh này không?"
      );
      if (!confirmDownload) return;
      const token = localStorage.getItem("token");
      try {
        const imageId = Number(this.id);
        const response = await axios.get(
          `http://localhost:8080/api/images/download/${imageId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
          }
        );

        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${this.title || "download"}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Tải ảnh thất bại:", error);
        if (error.response && error.response.status === 401) {
      
      this.$router.push("/auth");
        } 
        else{
          alert("Không thể tải ảnh. Vui lòng thử lại sau.");
        }
        
      }
    },
  },
});
</script>

<style scoped>
.break-inside-avoid {
  break-inside: avoid;
}</style>
