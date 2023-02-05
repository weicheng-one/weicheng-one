<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import { usePostStore } from "@/stores/PostStore";
import StarterKit from "@tiptap/starter-kit";
import TiptapMenu from "./TiptapMenu.vue";
import Highlight from "@tiptap/extension-highlight";
const postStore = usePostStore();
const editor = useEditor({
  content: "<p>I’m running Tiptap with Vue.js. 🎉</p>",
  extensions: [StarterKit, Highlight.configure({ multicolor: true })],
  editorProps: {
    attributes: {
      class: "rounded border-2 border-black px-5 focus:outline-none",
    },
  },
  onCreate: ({ editor }) => {
    postStore.content = editor.getHTML();
  },
  onUpdate: ({ editor }) => {
    postStore.content = editor.getHTML();
  },
});
</script>

<template>
  <div v-if="editor">
    <div class="relative overflow-hidden bg-white py-16">
      <div class="relative px-6 lg:px-8">
        <div class="mx-auto max-w-prose text-lg">
          <TiptapMenu :editor="editor" class="mb-3" />
        </div>
        <div class="prose prose-lg prose-indigo mx-auto text-gray-500">
          <editor-content :editor="editor" />
        </div>
      </div>
    </div>
  </div>
  <div>
    {{ postStore.content }}
  </div>
</template>
