<script setup lang="ts">
import { usePostStore } from "@/stores/PostStore";
import Tiptap from "@/components/Tiptap.vue";

const postStore = usePostStore();
function postSave() {
  clearTimeout(postStore.timer);
  postStore.timer = setTimeout(() => {
    postStore.postSave();
  }, 5000);
}
</script>
<template>
  <div>
    <div class="mx-auto max-w-prose text-lg">
      <input
        type="text"
        @input="postSave"
        v-model="postStore.title"
        required="true"
        :disabled="!postStore.editable"
        placeholder="Enter you title"
        class="w-full border-black border-2 rounded-md text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl"
      />
    </div>
    <div class="relative overflow-hidden bg-white mb-60">
      <div class="relative px-6 lg:px-8">
        <div class="prose prose-lg prose-indigo mx-auto text-gray-500">
          <Tiptap />
        </div>
      </div>
    </div>
  </div>
</template>
