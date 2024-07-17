<template>
  <div class="size-full flex items-center justify-center">
    <ElCard
      :style="resultBgColorStyle"
      class="p-5 text-center"
    >
      <div class="flex flex-col gap-5">
        <h1>{{ resultText }}</h1>
        <p>Ошибок: {{ practiceStore.errorsCount }}</p>
        <p>Кол-во верных ответов: {{ practiceStore.successesCount }}</p>
        <div>
          <!-- <ElButton>Проверить</ElButton> -->
          <ElButton @click="router.go(-1)">
            Повторить
          </ElButton>
          <ElButton @click="$router.push({ name: ROUTER_NAMES.HOME })">
            Выход
          </ElButton>
        </div>
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { ROUTER_NAMES } from '@/constants/router'
import { usePracticeStore } from '@/stores/practice'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const practiceStore = usePracticeStore()

const resultText = computed(() => (practiceStore.errorsCount > 2 ? 'Не сдал' : 'Сдал'))
const resultBgColorStyle = computed(() => ({
  backgroundColor: practiceStore.errorsCount > 2 ? 'red' : 'green'
}))
</script>
