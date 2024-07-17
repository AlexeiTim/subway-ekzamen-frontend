<template>
  <div class="h-[40px] p-4 bg-white flex items-center justify-between">
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
    <p>© 2024 Приложение "Экзамен". Версия 1.0.</p>
    <div />
  </div>
</template>

<script setup lang="ts">
import { links } from '@/constants/links';
</script>