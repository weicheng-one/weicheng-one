<script setup lang="ts">
import { usePostStore } from "@/stores/PostStore";
import PostEditHeading from "@/components/PostEditHeading.vue";
import PostEditContent from "@/components/PostEditContent.vue";
const postStore = usePostStore();
</script>
<template>
  <PostEditHeading />
  <PostEditContent />
  {{ postStore.id }}<br />
  {{ postStore.status }}<br />
  {{ postStore.date }} <br />
  {{ postStore.slug }}
</template>
<style>
@import url(@/assets/content-styles.css);
</style>
