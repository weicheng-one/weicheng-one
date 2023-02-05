<script setup lang="ts">
import { useFireStore } from "@/stores/FireStore";
import { usePostStore } from "@/stores/PostStore";
const postStore = usePostStore();
const fireStore = useFireStore();
</script>
<template>
  <div class="px-4 py-3 md:flex md:items-center md:justify-between">
    <div class="min-w-0 flex-1">
      <h2
        class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
      >
        Post Editor
      </h2>
    </div>
    <div class="mt-4 flex md:mt-0 md:ml-4">
      <button
        v-if="postStore.status == 'draft'"
        type="button"
        @click="fireStore.postSave"
        class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Save draft
      </button>
      <button
        v-else
        type="button"
        @click="fireStore.postDraft"
        class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Switch to draft
      </button>
      <button
        type="button"
        @click="$emit('postPrivew')"
        class="ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Preview
      </button>
      <button
        v-if="postStore.status == 'draft'"
        type="button"
        @click="fireStore.postPublish"
        class="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Publish
      </button>
      <button
        v-else
        type="button"
        @click="fireStore.postUpdate"
        class="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Update
      </button>
    </div>
  </div>
</template>
