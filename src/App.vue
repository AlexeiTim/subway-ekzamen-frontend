<script setup lang="ts">
import AppHeader from '@/components/Common/AppHeader.vue'
import { IMAGES } from '@/constants/images'
import { ModalsContainer } from 'vue-final-modal'
</script>

<template>
  <div
    class="h-[100vh] flex flex-col"
    :style="{
      backgroundImage: `url(${IMAGES.MAIN_BACKGROUND})`
    }"
  >
    <AppHeader class="mb-2" />
    <RouterView class="flex-grow" />
    <ModalsContainer />
  </div>
</template>
