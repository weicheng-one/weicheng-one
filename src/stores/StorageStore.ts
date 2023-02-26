import { defineStore } from "pinia";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { ref as vueRef } from "vue";
import { useLocalStorage } from "@vueuse/core";

export const useStorageStore = defineStore("storage", () => {
  interface Data {
    fullPath: string;
    name: string;
    url: string;
  }
  const storage = getStorage();
  const open = vueRef(false);
  const listRef = ref(storage, "images/");
  const data = useLocalStorage<Data[]>("storage:data", []);
  const latestData = useLocalStorage("storage:latestData", false);

  async function getFileAll() {
    if (!latestData.value) {
      //Start getting all files
      try {
        const res = await listAll(listRef);
        res.items.forEach(async (itemRef) => {
          const url = await getDownloadURL(ref(storage, itemRef.fullPath));
          data.value.push({
            fullPath: itemRef.fullPath,
            name: itemRef.name,
            url: url,
          });
        });
        open.value = true;
        latestData.value = true;
      } catch (error) {
        console.log(error);
      }
    } else {
      open.value = true;
    }
  }
  // Find all the prefixes and items.

  return { getFileAll, open, data, latestData };
});
