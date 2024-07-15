<template>
  <div class="size-full flex items-center justify-center">
    <ElCard class="!bg-red-600 p-5 text-center">
      <div class=" flex flex-col gap-5">
        <h1>Не сдал</h1>
        <p>Ошибок: N</p>
        <div>
          <ElButton>Проверить</ElButton>
          <ElButton>Повторить</ElButton>
          <ElButton @click="$router.push({ name: ROUTER_NAMES.HOME})">
            Выход
          </ElButton>
        </div>
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { ROUTER_NAMES } from '@/constants/router';
</script>