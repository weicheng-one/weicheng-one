<script setup lang="ts"></script>
<template>
  <main>
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/rockets">Rockets</RouterLink> |
    <RouterLink to="/users">Users</RouterLink>
    <RouterView />
  </main>
</template>
<style>
li {
  list-style-type: none;
}
</style>
