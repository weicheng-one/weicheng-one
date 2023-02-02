import { defineStore } from "pinia";
import { ref } from "vue";

export const useFileManagerStore = defineStore("fileManager", () => {
  const open = ref(false);
  return { open };
});
