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
      <ElInput placeholder="Введите название темы" />
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
          v-for="theme in filteredThemes"
          :key="theme.id"
          :theme="theme"
        />
      </div>
    </template>
    <template #button-ok>
      <ElButton>ОК</ElButton>
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
import themesDB from '@/db/themes.json';
import LayoutDashboard from '@/layouts/LayoutDashboard.vue';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const themes = ref(themesDB)

const filteredThemes = computed(() =>
  themes.value.filter(t => t.exam === Number(route.params.id))
)
</script>