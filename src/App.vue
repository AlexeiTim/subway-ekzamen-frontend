<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal';
</script>

<template>
  <div
    class="h-[100vh] p-1"
    style="background-image: url('./images/main-bg.jpg')"
  >
    <RouterView />
    <ModalsContainer />
  </div>
</template>
