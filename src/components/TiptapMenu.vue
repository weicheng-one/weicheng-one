<script setup lang="ts">
import TiptapMenuFirstButton from "./TiptapMenuFirstButton.vue";
import TiptapMenuMidButton from "./TiptapMenuMidButton.vue";
import TiptapMenuLastButton from "./TiptapMenuLastButton.vue";
import { useFileManagerStore } from "@/stores/FileManagerStore";
import {
  Bars3Icon,
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
  CodeBracketIcon,
  CodeBracketSquareIcon,
  PencilIcon,
} from "@heroicons/vue/24/outline";
const props = defineProps(["editor"]);
</script>
<template>
  <span class="isolate inline-flex rounded-md shadow-sm">
    <TiptapMenuFirstButton
      @click-button="props.editor.chain().focus().toggleCode().run()"
      :class="{ 'is-active': editor.isActive('highlight') }"
      ><CodeBracketIcon class="block h-6 w-6" aria-hidden="true"
    /></TiptapMenuFirstButton>
    <TiptapMenuMidButton
      @click-button="props.editor.chain().focus().toggleCodeBlock().run()"
      ><CodeBracketSquareIcon class="block h-6 w-6" aria-hidden="true"
    /></TiptapMenuMidButton>
    <TiptapMenuMidButton
      @click-button="props.editor.chain().focus().toggleHighlight().run()"
      ><PencilIcon class="block h-6 w-6" aria-hidden="true"
    /></TiptapMenuMidButton>
    <TiptapMenuMidButton
      @click-button="props.editor.chain().focus().setTextAlign('left').run()"
      ><Bars3BottomLeftIcon class="block h-6 w-6" aria-hidden="true"
    /></TiptapMenuMidButton>
    <TiptapMenuMidButton
      @click-button="props.editor.chain().focus().setTextAlign('center').run()"
    >
      <Bars3Icon class="block h-6 w-6" aria-hidden="true"
    /></TiptapMenuMidButton>
    <TiptapMenuLastButton
      @click-button="props.editor.chain().focus().setTextAlign('right').run()"
      ><Bars3BottomRightIcon class="block h-6 w-6" aria-hidden="true"
    /></TiptapMenuLastButton>
  </span>
</template>
