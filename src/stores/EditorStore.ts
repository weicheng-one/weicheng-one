import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEditorStore = defineStore('editor', () => {
  const timer = ref<NodeJS.Timeout>();
  const editable = ref<boolean>(false);
  const autoSave = ref<boolean>(false);
  function $reset() {
    timer.value = undefined;
    editable.value = false;
    autoSave.value = false;
  }

  return { timer, editable, autoSave, $reset };
});
