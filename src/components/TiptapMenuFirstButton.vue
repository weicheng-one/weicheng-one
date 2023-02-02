<template>
  <button
    @click="$emit('clickButton')"
    type="button"
    class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
  >
    <slot></slot>
  </button>
</template>
