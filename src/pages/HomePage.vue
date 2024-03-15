<template>
  <LayoutDashboard>
    <template #title>
      <h1>
        Выберите экзамен
      </h1>
    </template>
    <template #search>
      <ElInput />
    </template>
    <template #list>
      <ExamList />
    </template>
    <template #button-ok>
      <ButtonGoToExamThemes />
    </template>
    <template #button-cancel>
      <ButtonCancel />
    </template>
    <template #button-count>
      <ButtonExamInfo />
    </template>
  </LayoutDashboard>
</template>

<script lang="ts" setup>
import ButtonCancel from '@/components/Home/ButtonCancel.vue';
import ButtonGoToExamThemes from '@/components/Home/ButtonGoToExamThemes.vue';
import ButtonExamInfo from '@/components/Home/ButtonExamInfo.vue';
import ExamList from '@/components/Home/ExamList.vue';
import LayoutDashboard from '@/layouts/LayoutDashboard.vue';
</script>
