<template>
  <div class="h-[40px] bg-white flex items-center justify-center">
    <div class="flex items-center gap-1">
      <ElLink
        v-for="link in links"
        :key="link.id"
        link
        :href="link.href"
        target="_blank"
      >
        {{ link.resource }}
      </ElLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { links } from '@/constants/links';
</script>