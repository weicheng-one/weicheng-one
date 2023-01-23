<script setup lang="ts">
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { usePostStore } from "@/stores/PostStore";
const postStore = usePostStore();
const editor = Editor;
const editorConfig = {
  ckbox: {
    tokenUrl:
      "https://95025.cke-cs.com/token/dev/a73LVhktPD5JSDKaCFn3evuCOgnqKKCqJw7g?limit=10",
  },
  title: {
    placeholder: "Type your title",
  },
  placeholder: "Type or paste your content here.",
  heading: {
    options: [
      { model: "paragraph", title: "Paragraph" },
      {
        model: "heading2",
        view: "h2",
        title: "Heading",
      },
    ],
  },
  codeBlock: {
    languages: [
      { language: "css", label: "CSS", class: "CSS" },
      { language: "html", label: "HTML", class: "HTML" },
      { language: "terminal", label: "TERMINAL", class: "TERMINAL" },
      { language: ".env", label: ".env", class: ".env" },
    ],
  },
};
</script>
<template>
  <div class="relative overflow-hidden bg-white py-16">
    <div
      class="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full lg:[overflow-anchor:none]"
    >
      <div
        class="relative mx-auto h-full max-w-prose text-lg"
        aria-hidden="true"
      >
        <svg
          class="absolute top-12 left-full translate-x-32 transform"
          width="404"
          height="384"
          fill="none"
          viewBox="0 0 404 384"
        >
          <defs>
            <pattern
              id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="384"
            fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
          />
        </svg>
        <svg
          class="absolute top-1/2 right-full -translate-y-1/2 -translate-x-32 transform"
          width="404"
          height="384"
          fill="none"
          viewBox="0 0 404 384"
        >
          <defs>
            <pattern
              id="f210dbf6-a58d-4871-961e-36d5016a0f49"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="384"
            fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
          />
        </svg>
        <svg
          class="absolute bottom-12 left-full translate-x-32 transform"
          width="404"
          height="384"
          fill="none"
          viewBox="0 0 404 384"
        >
          <defs>
            <pattern
              id="d3eb07ae-5182-43e6-857d-35c643af9034"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="384"
            fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
          />
        </svg>
      </div>
    </div>
    <div class="relative px-6 lg:px-8">
      <div class="prose prose-lg prose-indigo mx-auto ck-content text-gray-500">
        <ckeditor
          :editor="editor"
          v-model="postStore.content"
          :config="editorConfig"
        ></ckeditor>
      </div>
    </div>
  </div>
</template>
