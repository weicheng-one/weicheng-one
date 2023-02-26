<script setup lang="ts">
import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/vue-3";
import { usePostStore } from "@/stores/PostStore";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import PostEditFileManager from "@/components/PostEditFileManager.vue";
import TiptapMenu from "@/components/TiptapMenu.vue";
import { ref } from "vue";
import { useStorageStore } from "@/stores/StorageStore";

const postStore = usePostStore();
const storageStore = useStorageStore();
const addMainImage = ref<boolean>(false);
const editor = useEditor({
  extensions: [StarterKit, Image, Highlight.configure({ multicolor: true })],
  editorProps: {
    attributes: {
      class: "rounded border-2 border-black px-5 focus:outline-none",
    },
  },
  editable: postStore.editable,
  onCreate: async ({ editor }) => {
    await postStore.postGet();
    postStore.editable = true;
    editor.commands.setContent(postStore.content);
    editor.setEditable(postStore.editable);
  },
  onUpdate: ({ editor }) => {
    if (postStore.autoSave) {
      clearTimeout(postStore.timer);
      postStore.content = editor.getHTML();
      postStore.timer = setTimeout(() => {
        postStore.postSave();
      }, 5000);
    } else {
      postStore.autoSave = true;
    }
  },
});
function addImage(url: string) {
  if (addMainImage.value) {
    postStore.imageUrl = url;
    addMainImage.value = false;
    storageStore.open = false;
  } else {
    editor.value?.chain().focus().setImage({ src: url }).run();
    storageStore.open = false;
  }
}
function addMainImageHandle() {
  storageStore.open = true;
  addMainImage.value = true;
}

function toggleBold() {
  editor.value?.chain().focus().toggleBold().run();
}
function toggleCode() {
  editor.value?.chain().focus().toggleCode().run();
}
</script>

<template>
  <div
    class="relative w-full aspect-[16/9] rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] cursor-pointer"
    @click="addMainImageHandle"
  >
    <svg
      v-if="postStore.imageUrl == '' || !postStore.imageUrl"
      class="absolute w-24 h-24 inset-1/2 -translate-x-1/2 -translate-y-1/2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
    <img
      v-else
      :src="postStore.imageUrl"
      alt=""
      class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] my-3"
    />
    <div
      class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"
    ></div>
  </div>
  <div v-if="editor" class="mb-3">
    <TiptapMenu @toggle-bold="toggleBold" @toggle-code="toggleCode" />
  </div>
  <FloatingMenu :editor="editor" v-if="editor">
    <TiptapMenu @toggle-bold="toggleBold" @toggle-code="toggleCode" />
  </FloatingMenu>
  <BubbleMenu :editor="editor" v-if="editor" :tippy-options="{ duration: 100 }">
    <TiptapMenu @toggle-bold="toggleBold" @toggle-code="toggleCode" />
  </BubbleMenu>

  <editor-content :editor="editor" />
  <PostEditFileManager @add-image="addImage" />
</template>
