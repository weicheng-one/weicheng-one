<script setup lang="ts">
import { useStorageStore } from "@/stores/StorageStore";
const storageStore = useStorageStore();
defineEmits(["toggleBold", "toggleCode"]);
</script>
<template>
  <button
    @click="$emit('toggleBold')"
    class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-3 py-2 text-xl text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
  >
    <i class="ri-bold"></i>
  </button>
  <button
    @click="storageStore.getFileAll()"
    class="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-xl text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
  >
    <i class="ri-image-fill"></i>
  </button>
  <button
    class="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-2 text-xl text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
    @click="$emit('toggleCode')"
  >
    <i class="ri-code-view"></i>
  </button>
</template>
