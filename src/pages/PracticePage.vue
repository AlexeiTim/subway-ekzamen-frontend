<template>
  <LayoutPractice>
    <template #header>
      <div>
        <p>Тренировка/Экзамен</p>
        <p>Название темы</p>
        <p>Ошибок N. Предварительная оцена N</p>
      </div>
    </template>
    <template #question>
      <div>
        Вопрос N1 из N
        <p class="ml-2">
          {{ question }}
        </p>
      </div>
    </template>
    <template #answers>
      <div class="flex flex-col gap-1">
        <ElButton
          v-for="{ id, text, correct } in answers"
          :key="id"
          :type="defineButtonType(id)"
          size="large"
          style="justify-content: left"
          @click="handleSelectAnswer({id, correct})"
        >
          {{ text }}
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
          class="basis-[30%]"
          size="large"
          @click="reset"
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
import ModalQuestionInfo from '@/components/Practice/Modals/ModalQuestionInfo.vue';
import LayoutPractice from '@/layouts/LayoutPractice.vue';
import { ElMessageBox } from 'element-plus';
import { computed, ref } from 'vue';
import { useModal } from 'vue-final-modal';

const selectedAnswer = ref()
const question = 'Какой-то очень длинный вопрос'
const answers = [
  {id: 1, text: 'Ответ 1 false', correct: false},
  {id: 2, text: 'Ответ 2 true', correct: true},
  {id: 3, text: 'Ответ 3 false', correct: false},
  {id: 4, text: 'Ответ 4 false', correct: false},
]

const {open, close} = useModal({
  component: ModalQuestionInfo,
  attrs: {
    onClose() {
      close()
    }
  }
})

const alertTitle = computed(() => {
  return selectedAnswer.value.correct ? 'Вы выбрали правильный ответ' : 'Вы ошиблись! Праввильный ответ выделен зеленым'
})

const alertType = computed(() => {
  return selectedAnswer.value.correct ? 'success' : 'error'
})

async function exit() {
  try {
    await ElMessageBox.confirm(
    'Вы уверены что хотите выйти? Текущий прогресс будет утерян',
    'Предупреждение!',
    {
      confirmButtonText: 'Да',
      cancelButtonText: 'Нет',
      type: 'warning',
    }
  )
  console.log('Yes')
  } catch (error) {
    console.log('No')
  }
}

function defineButtonType(id: number) {
  if (!selectedAnswer.value || id !== selectedAnswer.value.id) return 'default'
  return selectedAnswer.value.correct ? 'success' : 'danger'
}

function reset() {
  selectedAnswer.value = null
}

function handleSelectAnswer({ id, correct }: {id: number, correct: boolean}) {
  if (selectedAnswer.value) return

  selectedAnswer.value = {
    id,
    correct
  }
}
</script>

<style scoped>
.correct {
  background-color: green;
}

.uncorrect {
  background-color: red;
}
</style>