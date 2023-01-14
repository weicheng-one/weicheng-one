<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { GET_POSTS } from "@/graphql/queries";

const { result } = useQuery(GET_POSTS, {
  first: 10,
});
</script>
<template>
  <main>
    <h1 class="font-bold text-2xl mb-8">WeiCheng Blog</h1>

    <div v-if="result && result.posts">
      <div
        v-for="post in result.posts.nodes"
        :key="post.id"
        class="border-solid border-2 mb-5 p-5"
      >
        <RouterLink :to="post.uri">
          <h2 class="text-lg font-bold mb-2">{{ post.title }}</h2>
          <p class="line-clamp-2">
            {{ post.excerpt.slice(3, -5) }}
          </p></RouterLink
        >
      </div>
    </div>
  </main>
</template>
