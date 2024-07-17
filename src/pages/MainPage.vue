<script setup lang="ts">
import AppHeader from '@/components/Common/AppHeader.vue';
import LayoutApp from '@/layouts/LayoutApp.vue';
</script>

<template>
  <LayoutApp>
    <template #header>
      <AppHeader />
    </template>
    <template #content>
      <RouterView />
    </template>
  </LayoutApp>
</template>
