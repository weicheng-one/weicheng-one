import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const usePostStore = defineStore("post", () => {
  const id = useLocalStorage("post:id", "");
  const slug = useLocalStorage("post:slug", "");
  const status = useLocalStorage("post:status", "");
  const date = useLocalStorage("post:date", {});
  const content = useLocalStorage("post:content", "");
  return { content, date, id, slug, status };
});
