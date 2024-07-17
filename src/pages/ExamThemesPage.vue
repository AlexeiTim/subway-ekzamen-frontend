<template>
  <LayoutDashboard>
    <template #title>
      <div>
        <p class="text-[24px] text-white">
          Экзамен “Имя экзамена”
        </p>
        <p class="text-[24px] text-wrap">
          Выберите режим ЭКЗАМЕН или тему для тренировки
        </p>
      </div>
    </template>
    <template #search>
      <ElInput
        v-model="search"
        placeholder="Введите название темы"
        @input="handleSearchThemes"
      />
    </template>
    <template #list>
      <div class="flex flex-col gap-1">
        <ElButton
          style="justify-content: start; font-size: 18px; height: 40px"
          :type="examSelected ? 'primary' : 'warning'"
          @click="handleSelectExam"
        >
          Экзамен
        </ElButton>
        <ThemeItem
          v-for="theme in themesStore.themes"
          :key="theme.id"
          :theme="theme"
          @click="handleSelectTheme(theme)"
        />
      </div>
    </template>
    <template #button-ok>
      <ElButton
        :disabled="!examSelected && !selectedTheme"
        @click="goToPrePractivePage"
      >
        ОК
      </ElButton>
    </template>
    <template #button-cancel>
      <ElButton @click="handleCancelSelectedTheme">
        Отмена
      </ElButton>
    </template>
    <template #button-count>
      <ElButton @click="handleOpenExamSettingsModal">
        Количество вопросов
      </ElButton>
    </template>
  </LayoutDashboard>
</template>

<script lang="ts" setup>
import ExamSettingsModal from '@/components/ExamThemes/modals/ExamSettingsModal.vue'
import ThemeItem from '@/components/ExamThemes/ThemeItem.vue'
import { ROUTER_NAMES } from '@/constants/router'
import LayoutDashboard from '@/layouts/LayoutDashboard.vue'
import { useExamThemesPageStore } from '@/stores/pages/exam-themes-page-store'
import { useThemesStore } from '@/stores/theme'
import type { Theme } from '@/types/theme'
import { useDebounceFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useModal } from 'vue-final-modal'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const themesStore = useThemesStore()
const examThemePageStore = useExamThemesPageStore()
const { selectedTheme } = storeToRefs(examThemePageStore)
const examId = +route.params.id
const search = ref('')
const examSelected = ref(false)

function handleSelectExam() {
  selectedTheme.value = null
  examSelected.value = true
}

function handleCancelSelectedTheme() {
  selectedTheme.value = null
  examSelected.value = false
}

function handleSelectTheme(theme: Theme | null) {
  selectedTheme.value = theme
  examSelected.value = false
}

function handleOpenExamSettingsModal() {
  const { close } = useModal({
    component: ExamSettingsModal,
    attrs: {
      onClose() {
        close()
      }
    }
  })
  // open()
}

function goToPrePractivePage() {
  if (examSelected.value) {
    router.push({ name: ROUTER_NAMES.EXAM_PRACTICE, params: { examId } })
    return
  }

  if (!selectedTheme.value) return
  router.push({
    name: ROUTER_NAMES.SETTING_PRACTICE,
    params: { themeId: selectedTheme.value.id, examId: selectedTheme.value.exam.id },
    query: { is_exam: 0 }
  })
}

const handleSearchThemes = useDebounceFn((value: string) => {
  themesStore.getAll(examId, { search: value })
}, 400)

onMounted(async () => {
  if (examId) await themesStore.getAll(examId)
})
</script>
