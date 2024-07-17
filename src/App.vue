<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal';
import { IMAGES } from '@/constants/images'
</script>

<template>
  <div
    class="flex flex-col h-full"
    :style="{
      backgroundImage: `url(${IMAGES.MAIN_BACKGROUND})`
    }"
  >
    <RouterView />
    <ModalsContainer />
  </div>
</template>
