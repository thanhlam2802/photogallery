<template>
    <div class="border bg-white rounded-lg p-3">
      <div class="flex flex-wrap items-center gap-2">
        <!-- Các thẻ tag -->
        <span
          v-for="(tag, index) in tags"
          :key="index"
          class="bg-gray-100 text-black-100 px-2 py-1 rounded-md flex items-center"
        >
          {{ tag.name}}
          <i
            class="fas fa-times ml-2 cursor-pointer"
            @click="removeTag(index)"
          ></i>
        </span>
  
        <!-- Ô input nằm cùng hàng -->
        <div class="relative flex-grow min-w-[150px]">
          <input
            v-model="input"
            @input="searchSuggestions"
            @keydown.enter.prevent="addTag"
            type="text"
            placeholder="Nhập thẻ và nhấn Enter"
            class="w-full   rounded-md  focus:ring-2 focus:ring-white focus:outline-none"
          />
  
          <!-- Dropdown gợi ý -->
          <ul
            v-if="suggestions.length"
            class="absolute z-10 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-md mt-1 max-h-48 overflow-auto"
          >
            <li
              v-for="(suggestion, index) in suggestions"
              :key="index"
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              @click="selectSuggestion(suggestion)"
            >
              {{ suggestion.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, watch } from "vue";
import axios from "axios";

const props = defineProps({
  modelValue: Array,
});
const emit = defineEmits(["update:modelValue"]);

const tags = ref([...props.modelValue]);
const input = ref("");
const suggestions = ref([]);

const updateTags = () => {
  emit("update:modelValue", tags.value);
};

const addTag = () => {
  const trimmed = input.value.trim();
  if (
    trimmed &&
    !tags.value.some((tag) => tag.name.toLowerCase() === trimmed.toLowerCase())
  ) {
    tags.value.push({ id: null, name: trimmed }); // thêm thẻ người dùng nhập tay
    updateTags();
  }
  input.value = "";
  suggestions.value = [];
};

const selectSuggestion = (suggestion) => {
  if (!tags.value.some((tag) => tag.name === suggestion.name)) {
    tags.value.push(suggestion); // suggestion là object { id, name }
    updateTags();
  }
  input.value = "";
  suggestions.value = [];
};

const removeTag = (index) => {
  tags.value.splice(index, 1);
  updateTags();
};

const searchSuggestions = async () => {
  const query = input.value.trim();
  if (query.length < 2) {
    suggestions.value = [];
    return;
  }

  try {
    const res = await axios.get(
      `http://localhost:8080/api/tags/search?query=${query}`
    );
    suggestions.value = res.data.filter(
      (tag) => !tags.value.some((t) => t.name === tag.name)
    );
  } catch (error) {
    console.error("Không thể tìm thẻ:", error);
  }
};

watch(
  () => props.modelValue,
  (newVal) => {
    tags.value = [...newVal];
  }
);
</script>
