<template>
  <div class="size-full flex flex-col">
    <div>
      <p>Экзамен “Имя экзамена”</p>
      <p>Тема “Название выбранной темы”</p>
    </div>
    <div class="flex items-center justify-center h-full">
      <ElCard class="flex flex-col justify-between">
        <div class="flex flex-col gap-20">
          <p>
            По выбранной теме имеется ХХ вопросов.
            Сколько вопросов задать?
          </p>
          <div class="flex items-center justify-around">
            <div class="flex items-center">
              <ElInput
                type="number"
                class="!w-[50%]"
              />
              <ElButton>-</ElButton>
              <ElButton>+</ElButton>
            </div>
            <ElButton>Все</ElButton>
          </div>

          <div class="flex items-center justify-around">
            <ElButton @click="handleGoToPrePractice">
              Принять
            </ElButton>
            <ElButton>Отменить</ElButton>
          </div>
        </div>
      </ElCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ROUTER_NAMES } from '@/constants/router';
import { useRouter } from 'vue-router';
const router = useRouter()

function handleGoToPrePractice() {
  router.push({name: ROUTER_NAMES.PRE_PRACTICE})
}
</script>