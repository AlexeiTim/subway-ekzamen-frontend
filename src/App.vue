<script setup lang="ts">
import AppHeader from '@/components/Common/AppHeader.vue';
import LayoutApp from '@/layouts/LayoutApp.vue';
import { ModalsContainer } from 'vue-final-modal';
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
  <ModalsContainer />
</template>
