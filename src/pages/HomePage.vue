<template>
  <LayoutDashboard>
    <template #title>
      <h1>
        Выберите экзамен
      </h1>
    </template>
    <template #search>
      <SearchExam />
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
import ButtonExamInfo from '@/components/Home/ButtonExamInfo.vue';
import ButtonGoToExamThemes from '@/components/Home/ButtonGoToExamThemes.vue';
import ExamList from '@/components/Home/ExamList.vue';
import SearchExam from '@/components/Home/SearchExam.vue';
import { ROUTER_NAMES } from '@/constants/router';
import LayoutDashboard from '@/layouts/LayoutDashboard.vue';
import router from '@/router';

router.push({ name: ROUTER_NAMES.PRACTICE})
</script>
