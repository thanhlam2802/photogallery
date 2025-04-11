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

      <h1 class="text-2xl font-semibold mb-6">Kéo và thả để tải lên hoặc</h1>

      <button
        @click="triggerFileInput"
        class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full mb-6"
      >
        Khám phá
      </button>

     

      <p class="text-gray-500 mb-10">
        (Bạn còn
        <span class="text-green-500 font-medium">50 lượt tải lên</span> trong
        ngày)
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

    <!-- Khi đã có ảnh -->
    <div v-else class="bg-white min-h-screen flex justify-center">
      <div class="flex p-4">
        <!-- Sidebar trái -->
        <div class="flex flex-col items-center space-y-4 m-6">
          <!-- Div này sẽ trở thành nút chọn ảnh -->
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

        <!-- Nội dung chính -->
        <div class="w-full max-w-4xl m-6">
          <!-- Hiển thị ảnh lỗi -->
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
                Duyệt ảnh mới
              </button>
            </div>
            <button class="text-pink-500 p-10" @click="removeImage(index)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>

          <!-- Hiển thị ảnh hợp lệ -->
          <div
            v-for="(img, index) in uploadedImages.filter((i) => i.status)"
            :key="'ok-' + index"
            class="bg-gray-100 p-10 mt-4 rounded-lg flex space-x-4"
          >
            <img :src="img.url" class="w-[35%] object-cover rounded-lg" />
            <div class="flex-1 space-y-4">
              <div>
                <label class="block text-gray-600"
                  >Tiêu đề (không bắt buộc)</label
                >
                <input
                  class="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Nhập tiêu đề"
                  type="text"
                  v-model="img.title"
                />
              </div>
              <div>
                <label class="block text-gray-600">Thẻ (không bắt buộc)</label>
                <input
                  class="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Nhập thẻ"
                  type="text"
                  v-model="img.tags"
                />
              </div>
              <div>
                <label class="block text-gray-600"
                  >Địa điểm (không bắt buộc)</label
                >
                <input
                  class="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Nhập địa điểm"
                  type="text"
                  v-model="img.location"
                />
              </div>
            </div>
            <button class="text-gray-500 p-10" @click="removeImage(index)">
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
          <p class="text-green-500">Nội dung đã tải lên</p>
          <p class="text-gray-500">
            Đã tải lên {{ uploadedImages.filter((i) => i.status).length }}/{{
              totalImages
            }}
            ảnh và video
          </p>
        </div>
        <div class="flex items-center space-x-1">
          <div class="w-4 h-4 bg-red-500 rounded-full"></div>
          <p class="text-red-500">Nội dung không tải lên thành công</p>
          <p class="text-gray-500">
            Không thể tải lên {{ failedUploads }}/{{ totalImages }} ảnh và video
          </p>
        </div>
        <button class="bg-green-500 text-white px-4 py-2 rounded-lg">
          Gửi nội dung của bạn
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const uploadedImages = ref([]);
const failedUploads = ref(0);
const totalImages = ref(0);
const fileInput = ref(null);

const tips = [
  "Nội dung <strong>ban đầu</strong> mà bạn thu thập",
  "Quan tâm đến quyền của người khác",
  "Ảnh và video <strong>chất lượng cao</strong>",
  "Không bao gồm hình ảnh khỏa thân, nội dung bạo lực hoặc thù địch",
  "Được tải xuống và sử dụng <strong>miễn phí</strong>",
  "Đọc Điều khoản của Pexels",
];

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  const files = event.target.files;
  totalImages.value = files.length;

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
            tip: "Ảnh tải lên phải có kích thước tối thiểu 4 megapixel. Ảnh này sẽ không được đăng.",
          });
          failedUploads.value++;
        } else {
          uploadedImages.value.push({
            url,
            status: true,
            tip: "Tải lên thành công",
            title: "",
            tags: "",
            location: "",
          });
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};

const retryUpload = () => {
  fileInput.value.click();
};

const removeImage = (index) => {
  const removed = uploadedImages.value.splice(index, 1)[0];
  if (!removed.status) {
    failedUploads.value--;
  }
  totalImages.value--;
};
</script>

<style scoped>
input[type="file"] {
  display: none;
}
</style>
