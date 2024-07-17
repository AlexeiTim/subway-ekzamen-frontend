<template>
  <LayoutPractice class="text-white">
    <template #header>
      <div>
        <p>Тренировка/Экзамен</p>
        <p>{{ currentQuestion?.theme?.title }}</p>
        <p>Ошибок N. Предварительная оцена N</p>
      </div>
    </template>
    <template #question>
      <div>
        Вопрос N{{ currentQuestionsIndex + 1 }} из {{ questionsCount }}
        <p class="ml-2 text-white">
          {{ currentQuestion?.text }}
        </p>
      </div>
    </template>
    <template #answers>
      <div class="flex flex-col gap-1">
        <ElButton
          v-for="answer in currentAnswers"
          :key="answer.id"
          :type="defineButtonType(answer)"
          size="large"
          style="justify-content: left"
          @click="handleSelectAnswer(answer)"
        >
          {{ answer.text }}
        </ElButton>
      </div>
    </template>
    <template #footer-alert>
      <ElAlert
        v-if="selectedAnswer"
        :title="alertTitle"
        :type="alertType"
        :closable="false"
        effect="dark"
      />
    </template>
    <template #footer-buttons>
      <div
        v-if="selectedAnswer"
        class="flex gap-2 justify-between"
      >
        <ElButton
          class="basis-[30%]"
          size="large"
          @click="open"
        >
          Подробнее
        </ElButton>
        <ElButton
          :disabled="!selectedAnswer"
          class="basis-[30%]"
          size="large"
          @click="goToNextQuestion"
        >
          Продолжить
        </ElButton>
        <ElButton
          class="basis-[30%]"
          size="large"
          @click="exit"
        >
          Выход
        </ElButton>
      </div>
    </template>
  </LayoutPractice>
</template>

<script setup lang="ts">
import ModalQuestionInfo from '@/components/Practice/Modals/ModalQuestionInfo.vue'
import { ROUTER_NAMES } from '@/constants/router'
import LayoutPractice from '@/layouts/LayoutPractice.vue'
import { usePracticeStore } from '@/stores/practice'
import { useQuestionsStore } from '@/stores/question'
import { ElMessageBox } from 'element-plus'
import { computed, onMounted, ref } from 'vue'
import { useModal } from 'vue-final-modal'
import { useRoute, useRouter } from 'vue-router'

const selectedAnswer = ref()
const router = useRouter()
const route = useRoute()
const questionsStore = useQuestionsStore()
const practiceStore = usePracticeStore()
const query = route.query
const questionsCount = query.questions_count
const themeId = +route.params.themeId
const currentQuestionsIndex = ref(0)

const currentQuestion = computed(() => {
  return questionsStore.questions[currentQuestionsIndex.value]
})

const currentAnswers = computed(() => {
  return currentQuestion.value?.answers ?? []
})

const { open, close } = useModal({
  component: ModalQuestionInfo,
  attrs: {
    onClose() {
      close()
    }
  }
})

const alertTitle = computed(() => {
  return selectedAnswer.value.is_correct
    ? 'Вы выбрали правильный ответ'
    : 'Вы ошиблись! Праввильный ответ выделен зеленым'
})

const alertType = computed(() => {
  return selectedAnswer.value.is_correct ? 'success' : 'error'
})

async function exit() {
  try {
    await ElMessageBox.confirm(
      'Вы уверены что хотите выйти? Текущий прогресс будет утерян',
      'Предупреждение!',
      {
        confirmButtonText: 'Да',
        cancelButtonText: 'Нет',
        type: 'warning'
      }
    )
    console.log('Yes')
  } catch (error) {
    console.log('No')
  }
}

function defineButtonType(answer: any) {
  if (selectedAnswer.value && answer.is_correct) return 'success'
  if (!selectedAnswer.value || answer.id !== selectedAnswer.value.id) return 'default'
  return selectedAnswer.value.is_correct ? 'success' : 'danger'
}

function goToNextQuestion() {
  if (currentQuestionsIndex.value + 1 === Number(questionsCount)) {
    router.push({ name: ROUTER_NAMES.RESULTS })
    return
  }
  selectedAnswer.value = null
  currentQuestionsIndex.value += 1
}

function handleSelectAnswer({ id, is_correct }: { id: number; is_correct: boolean }) {
  if (selectedAnswer.value) return
  if (is_correct) practiceStore.incrementSuccessesCount()
  else practiceStore.incrementErrorsCount()

  selectedAnswer.value = {
    id,
    is_correct
  }
}

onMounted(() => {
  practiceStore.$reset()
  questionsStore.getQuestions(themeId, { questions_count: Number(questionsCount) })
})
</script>

<style scoped>
.correct {
  background-color: green;
}

.uncorrect {
  background-color: red;
}
</style>
