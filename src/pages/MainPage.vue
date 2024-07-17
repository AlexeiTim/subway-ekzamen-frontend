<script setup lang="ts">
import AppFooter from '@/components/Common/AppFooter.vue';
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
    <template #footer>
      <AppFooter />
    </template>
  </LayoutApp>
</template>
