<template>
  <div
    class="flex flex-col h-full"
    :style="{
      backgroundImage: `url(${IMAGES.MAIN_BACKGROUND})`
    }"
  >
    <div class="mb-2"> 
      <slot name="header" />
    </div>

    <div class="max-w-[1240px] mx-auto flex-grow w-full px-1 py-1">
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IMAGES } from '@/constants/images';
</script>