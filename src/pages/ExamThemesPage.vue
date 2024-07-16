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
          type="warning"
          style="justify-content: start; font-size: 18px; height: 40px;"
        >
          Экзамен
        </ElButton>
        <ThemeItem
          v-for="theme in themesStore.themes"
          :key="theme.id"
          :theme="theme"
          @click="selectedTheme = theme"
        />
      </div>
    </template>
    <template #button-ok>
      <ElButton @click="goToPrePractivePage">
        ОК
      </ElButton>
    </template>
    <template #button-cancel>
      <ElButton>Отмена</ElButton>
    </template>
    <template #button-count>
      <ElButton>Количество вопросов</ElButton>
    </template>
  </LayoutDashboard>
</template>

<script lang="ts" setup>
import ThemeItem from '@/components/ExamThemes/ThemeItem.vue';
import { ROUTER_NAMES } from '@/constants/router';
import LayoutDashboard from '@/layouts/LayoutDashboard.vue';
import { useThemesStore } from '@/stores/theme';
import type { Theme } from '@/types/theme';
import { useDebounceFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const themesStore = useThemesStore()
const examId = +route.params.id
const search  = ref('')
const selectedTheme = ref<Theme | null>(null)

function goToPrePractivePage() {
  if (!selectedTheme.value) return

  router.push({ name: ROUTER_NAMES.SETTING_PRACTICE, params: { themeId: selectedTheme.value.id, examId: selectedTheme.value.exam_id }})
}

const handleSearchThemes = useDebounceFn((value: string) => {
  themesStore.getAll(examId, { search: value })
}, 400)

onMounted(async () => {
  if (examId)
    await themesStore.getAll(examId)
})
</script>