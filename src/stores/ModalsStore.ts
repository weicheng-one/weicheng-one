import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalsStore = defineStore("modals", () => {
  const showDelete = ref<boolean>(false);

  return {
    showDelete,
  };
});
