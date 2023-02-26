import { Editor } from "@tiptap/vue-3";
import { defineStore } from "pinia";
import { ref } from "vue";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";

export const useEditorStore = defineStore("editor", () => {
  const editor = new Editor({
    extensions: [StarterKit, Image, Highlight.configure({ multicolor: true })],
    editorProps: {
      attributes: {
        class: "rounded border-2 border-black px-5 focus:outline-none",
      },
    },
  });

  return { editor };
});
