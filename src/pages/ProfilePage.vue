<template>
  <div>
    <!-- Cover Image -->
    <div class="h-60 sm:h-80 w-full relative">
      <img
        :src="profile.coverUrl || 'default-cover.jpg'"
        alt="Cover"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"
      ></div>
    </div>

    <!-- Profile Info -->
    <div class="container mx-auto px-4">
      <div
        class="relative -mt-16 sm:-mt-24 mb-8 flex flex-col sm:flex-row sm:items-end"
      >
        <div
          class="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white overflow-hidden z-10"
        >
          <img
            v-if="profile.avatarUrl"
            :src="profile.avatarUrl"
            :alt="profile.name"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="w-full h-full bg-blue-500 flex items-center justify-center"
          >
            <i class="fas fa-user w-12 h-12 text-white"></i>
          </div>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-4 sm:mb-2 flex-grow">
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">
            {{ profile.name }}
          </h1>
          <p class="text-gray-500">@{{ profile.username }}</p>
        </div>
        <div class="mt-4 sm:mt-0">
          <button
            v-if="profile.isCurrentUser"
            class="flex items-center px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 rounded-lg text-gray-700 transition-colors"
          >
            <i class="fas fa-cogs w-4 h-4 mr-2"></i>
            Edit Profile
          </button>
          <button
            v-else
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
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
              <a
                :href="'https://' + profile.website"
                class="text-blue-600 hover:underline"
                >{{ profile.website }}</a
              >
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
              <div class="text-2xl font-bold">{{ photos.length }}</div>
              <div class="text-gray-500">Photos</div>
            </div>
            <div>
              <div class="text-2xl font-bold">
                {{ profile.followers.toLocaleString() }}
              </div>
              <div class="text-gray-500">Followers</div>
            </div>
            <div>
              <div class="text-2xl font-bold">
                {{ profile.following.toLocaleString() }}
              </div>
              <div class="text-gray-500">Following</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="border-b border-gray-200 mb-8">
        <div class="flex overflow-x-auto">
          <button
            :class="[
              'py-4 px-6 border-b-2 font-medium text-sm flex items-center whitespace-nowrap',
              activeTab === 'photos'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            ]"
            @click="setActiveTab('photos')"
          >
            <i class="fas fa-th w-5 h-5 mr-2"></i>
            Photos
          </button>
          <button
            :class="[
              'py-4 px-6 border-b-2 font-medium text-sm flex items-center whitespace-nowrap',
              activeTab === 'collections'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            ]"
            @click="setActiveTab('collections')"
          >
            <i class="fas fa-bookmark w-5 h-5 mr-2"></i>
            Collections
          </button>
          <button
            :class="[
              'py-4 px-6 border-b-2 font-medium text-sm flex items-center whitespace-nowrap',
              activeTab === 'liked'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            ]"
            @click="setActiveTab('liked')"
          >
            <i class="fas fa-heart w-5 h-5 mr-2"></i>
            Liked Photos
          </button>
        </div>
      </div>

      <!-- Photos Grid -->
      <div
        v-if="activeTab === 'photos'"
        class="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4"
      >
        <ImageCard
          v-for="photo in photos"
          :key="photo.id"
          :id="photo.id.toString()"
          :imageUrl="photo.imageUrl"
          :photographer="photo.photographer"
          :width="photo.width"
          :height="photo.height"
          :liked="likedImages.includes(photo.id)"
          @like="handleLike(photo.id)"
        />
      </div>

      <!-- Collections -->
      <div
        v-if="activeTab === 'collections'"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12"
      >
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
          <div
            class="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex flex-col justify-end p-4"
          >
            <h3 class="text-lg font-semibold text-white">
              {{ collection.name }}
            </h3>
            <p class="text-white/80 text-sm">{{ collection.count }} photos</p>
          </div>
        </div>
      </div>

      <!-- Liked Photos -->
      <!-- Liked Photos -->
      <div
        v-if="activeTab === 'liked'"
        class="flex flex-col items-center justify-center py-12 text-center"
      >
        <i
          class="fas fa-heart w-16 h-16 text-gray-300 mb-4"
          v-if="likedImages.length"
        ></i>
        <h3
          class="text-xl font-semibold text-gray-700 mb-2"
          v-if="likedImages.length"
        ></h3>
        <p class="text-gray-500 max-w-md" v-if="likedImages.length === 0">
          No liked photos yet. When you like photos, they will appear here.
        </p>

        <!-- Hiển thị ảnh đã liked -->
        <div
          v-if="likedImages.length"
          class="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4"
        >
          <ImageCard
            v-for="photo in liked"
            :key="photo.id"
            :id="photo.id.toString()"
            :imageUrl="photo.imageUrl"
            :photographer="photo.photographer"
            :width="photo.width"
            :height="photo.height"
            :liked="likedImages.includes(photo.id)"
            @like="handleLike(photo.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/userStore";
import ImageCard from "../components/ui/ImageCard.vue";
import axios from "axios";

export default {
  components: {
    ImageCard,
  },
  setup() {
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    const activeTab = ref("photos");
    const likedImages = ref([]);
    const liked = ref([]);
    const photos = ref([]); // bạn thiếu return photos

    const profile = computed(() => {
      const account = user.value?.[0]?.account;

      if (!account) {
        return {
          username: "",
          name: "",
          avatarUrl: "",
          coverUrl: "",
          bio: "",
          location: "",
          website: "",
          joinDate: "",
          followers: 0,
          following: 0,
          collections: [],
          isCurrentUser: true,
        };
      }

      return {
        username: account.username || "",
        name: `${account.firstName || ""} ${account.lastName || ""}`,
        avatarUrl: account.avatarUrl || "",
        coverUrl: "",
        bio: account.bio || "",
        location: account.location || "",
        website: account.website || "",
        joinDate: account.createdAt
          ? new Date(account.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })
          : "",
        followers: account.followers || 0,
        following: account.following || 0,
        collections: account.collections || [],
        isCurrentUser: true,
      };
    });
    const fetchLikedImagesByUser = async () => {
      try {
        if (!profile.value.username) return; // nếu chưa có username thì không fetch
        const response = await axios.get(
          `http://localhost:8080/api/images/liked/${profile.value.username}`
        );
        // Lưu thông tin ảnh đầy đủ vào liked (không chỉ ID)
        liked.value = response.data;
        likedImages.value = liked.value.map((photo) => photo.id); // Lưu trữ ID ảnh đã thích
        console.log("Ảnh đã thích:", liked.value); // Kiểm tra kết quả
      } catch (error) {
        console.error("Lỗi khi tải ảnh đã thích:", error);
      }
    };

    const fetchPhotosByUsername = async () => {
      try {
        if (!profile.value.username) return;
        const response = await axios.get(
          `http://localhost:8080/api/images/user/${profile.value.username}`
        );
        photos.value = response.data;
        console.log("Ảnh của user:", response.data); // Kiểm tra giá trị trả về từ API
      } catch (error) {
        console.error("Lỗi khi tải ảnh theo username:", error);
      }
    };

    const handleLike = (id) => {
      if (likedImages.value.includes(id)) {
        // Xóa ảnh khỏi danh sách liked
        likedImages.value = likedImages.value.filter((imgId) => imgId !== id);
      } else {
        // Thêm ảnh vào danh sách liked
        likedImages.value.push(id);
      }

      // Tải lại ảnh đã thích sau khi thay đổi trạng thái like/unlike
      fetchLikedImagesByUser();
    };

    const setActiveTab = (tab) => {
      activeTab.value = tab;
    };

    // Khi mounted
    onMounted(() => {
      userStore.loadFromLocalStorage();
    });

    watch(
      () => profile.value.username,
      (newUsername) => {
        if (newUsername) {
          console.log("Username đã có:", newUsername);
          fetchPhotosByUsername();
          fetchLikedImagesByUser();
        }
      },
      { immediate: true }
    );

    return {
      profile,
      photos,
      activeTab,
      likedImages,
      liked,
      handleLike,
      setActiveTab,
    };
  },
};
</script>
