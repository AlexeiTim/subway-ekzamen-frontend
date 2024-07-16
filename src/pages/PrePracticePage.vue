<template>
  <div
    class="flex items-center justify-center h-[100%]"
    @click="goToParctice"
  >
    <div class="text-center flex items-center justify-center flex-col gap-[124px]">
      <div class="h-[100%]">
        <h2
          class="text-[82px] text-[#DBFF00]"
        >
          Внимание!
        </h2>
        <h2 class="text-[82px] text-[#DBFF00]">
          Начинается проверка знаний.
        </h2>
        <h2 class="text-[82px] text-[#DBFF00]">
          Желаем успеха!
        </h2>
      </div>

      <div>
        <p
          class="text-white text-[32px]"
        >
          Вам будет предложено N вопросов
        </p>
        <p class="text-white text-[32px]">
          К каждому вопросу имеется несколько вариантов ответа
        </p>
        <p class="text-white text-[32px]">
          Выберите из них самый правильный или наиболее правильный ответ
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ROUTER_NAMES } from '@/constants/router';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const questionsCount = +route.query.questions_count
const themeId = +route.params.themeId
const examId = +route.params.examId

function goToParctice() {
  router.push({ 
    name: ROUTER_NAMES.PRACTICE,
    params: { themeId, examId },
    query: { questions_count: questionsCount }
   })
}
</script>
