import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalsStore = defineStore("modals", () => {
  const showModalDeletePost = ref<boolean>(false);
  const showModalDeleteFile = ref<boolean>(false);

  return {
    showModalDeletePost,
    showModalDeleteFile,
  };
});
