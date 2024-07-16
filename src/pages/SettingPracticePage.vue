<template>
  <div class="size-full flex flex-col">
    <div>
      <p>Экзамен “{{ currentTheme?.exam.title }}”</p>
      <p>Тема “{{ currentTheme?.title }}”</p>
    </div>
    <div class="flex items-center justify-center h-full">
      <ElCard class="flex flex-col justify-between">
        <div class="flex flex-col gap-20">
          <p>
            По выбранной теме имеется <b>{{ currentTheme?.questions_count ?? 0 }}</b> вопросов.
            Сколько вопросов задать?
          </p>
          <div class="flex items-center justify-around">
            <div class="flex items-center">
              <ElInputNumber
                v-model="selectedQuestionsCount"
                :max="currentTheme?.questions_count"
                :min="1"
                type="number"
              />
            </div>
            <ElButton @click="handleSelectAllQuestions">
              Все
            </ElButton>
          </div>

          <div class="flex items-center justify-around">
            <ElButton @click="handleGoToPrePractice">
              Принять
            </ElButton>
            <ElButton @click="router.go(-1)">
              Отменить
            </ElButton>
          </div>
        </div>
      </ElCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ROUTER_NAMES } from '@/constants/router';
import { useThemesStore } from '@/stores/theme';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const themesStore = useThemesStore()
const themeId = +route.params.themeId
const examId = +route.params.examId
const currentTheme = ref(null)
const selectedQuestionsCount = ref(1)


function handleGoToPrePractice() {
  router.push({name: ROUTER_NAMES.PRE_PRACTICE})
}

function handleSelectAllQuestions() {
  selectedQuestionsCount.value = currentTheme.value.questions_count
}

onMounted(async () => {
  currentTheme.value = await themesStore.getOne(examId, themeId)
  // console.log(currentTheme.value)
  selectedQuestionsCount.value = currentTheme.value.questions_count
})
</script>