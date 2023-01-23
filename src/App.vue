<script setup lang="ts">
//Firebase
import { useFirebaseStore } from "@/stores/FirebaseStore";
useFirebaseStore().firebaseInit();
</script>
<template>
  <RouterView />
</template>
